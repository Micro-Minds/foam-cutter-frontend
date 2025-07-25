
export function remapGCode2DInCm(
    existingGcode: string,
    stepSize: number,
    feedRate: number,
    sizeCm: number
): string {
    const lines = existingGcode.split(/\r?\n/);
    const motionRegex = /\bG0\b|\bG1\b/i;
    const xRe = /\bX(-?\d*\.?\d+)/i;
    const yRe = /\bY(-?\d*\.?\d+)/i;

    // ---------- 1) Find current bbox (in mm, since G21) ----------
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const raw of lines) {
        const line = raw.trim();
        if (!motionRegex.test(line)) continue;

        const xm = line.match(xRe);
        const ym = line.match(yRe);
        const x = xm ? parseFloat(xm[1]) : undefined;
        const y = ym ? parseFloat(ym[1]) : undefined;

        if (x !== undefined) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
        }
        if (y !== undefined) {
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }

    const width = isFinite(minX) && isFinite(maxX) ? maxX - minX : 0;
    const height = isFinite(minY) && isFinite(maxY) ? maxY - minY : 0;

    const originalMaxDimMm = Math.max(width, height);
    const targetMaxDimMm = sizeCm * 10; // <-- convert cm -> mm
    const scale = originalMaxDimMm > 0 ? targetMaxDimMm / originalMaxDimMm : 1;

    // ---------- 2) Transform + (optionally) densify ----------
    const out: string[] = [];
    const prec = 6;
    let lastPoint: { x: number; y: number } | null = null;

    const toFixed = (v: number) => v.toFixed(prec);
    const getG = (s: string) => {
        const m = s.match(/\bG(\d+)\b/i);
        return m ? Number(m[1]) : undefined;
    };
    const withFeed = (line: string, f: number) => {
        if (/\bF-?\d*\.?\d+\b/i.test(line)) {
            return line.replace(/\bF-?\d*\.?\d+\b/i, `F${f}`);
        }
        const idx = line.indexOf("(");
        const before = idx === -1 ? line : line.slice(0, idx).trimEnd();
        const comment = idx === -1 ? "" : " " + line.slice(idx);
        return `${before} F${f}${comment}`;
    };
    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
        Math.hypot(b.x - a.x, b.y - a.y);

    for (const raw of lines) {
        const line = raw;

        // Keep comments / blanks as-is
        if (!line.trim() || line.trim().startsWith("(")) {
            out.push(line);
            continue;
        }

        if (!motionRegex.test(line)) {
            out.push(line);
            continue;
        }

        const g = getG(line);
        if (g === undefined || (g !== 0 && g !== 1)) {
            out.push(line);
            continue;
        }

        // Parse coords
        const xm = line.match(xRe);
        const ym = line.match(yRe);
        const x = xm ? parseFloat(xm[1]) : undefined;
        const y = ym ? parseFloat(ym[1]) : undefined;

        // Scale
        const xs = x !== undefined ? x * scale : undefined;
        const ys = y !== undefined ? y * scale : undefined;

        // Rebuild motion line (without feed first)
        const cmd = `G${g}`;
        const commentIdx = line.indexOf("(");
        const comment = commentIdx >= 0 ? " " + line.slice(commentIdx) : "";
        const rebuiltBase =
            [cmd, xs !== undefined ? `X${toFixed(xs)}` : "", ys !== undefined ? `Y${toFixed(ys)}` : ""]
                .filter(Boolean)
                .join(" ") + comment;

        // Put feed rate on every motion line
        const rebuilt = withFeed(rebuiltBase, feedRate);

        // Densify straight moves if requested
        if (stepSize > 0 && g === 1 && (xs !== undefined || ys !== undefined)) {
            const current = {
                x: xs ?? (lastPoint?.x ?? 0),
                y: ys ?? (lastPoint?.y ?? 0),
            };

            if (lastPoint) {
                const d = dist(lastPoint, current);
                if (d > stepSize) {
                    const steps = Math.ceil(d / stepSize);
                    for (let s = 1; s < steps; s++) {
                        const t = s / steps;
                        const px = lastPoint.x + (current.x - lastPoint.x) * t;
                        const py = lastPoint.y + (current.y - lastPoint.y) * t;
                        out.push(withFeed(`G1 X${toFixed(px)} Y${toFixed(py)}`, feedRate));
                    }
                }
            }

            out.push(rebuilt);
            lastPoint = current;
            continue;
        }

        // Track last point
        if (xs !== undefined || ys !== undefined) {
            lastPoint = {
                x: xs ?? (lastPoint?.x ?? 0),
                y: ys ?? (lastPoint?.y ?? 0),
            };
        }

        out.push(rebuilt);
    }

    const result = out.join("\n");
    console.log(result);
    return result;
}

/**
 * Adjusts feedrate and step size (densification) of G-code
 * @param existingGcode Original G-code
 * @param stepSize Distance (mm) between interpolated points for G1 moves (<=0 disables)
 * @param feedRate New feedrate (mm/min)
 * @returns Modified G-code string
 */
export function updateFeedRateAndStepSize(
    existingGcode: string,
    stepSize: number,
    feedRate: number
): string {
    const lines = existingGcode.split(/\r?\n/);
    const motionRegex = /\bG0\b|\bG1\b/i;
    const xRe = /\bX(-?\d*\.?\d+)/i;
    const yRe = /\bY(-?\d*\.?\d+)/i;

    const out: string[] = [];
    const prec = 6;
    let lastPoint: { x: number; y: number } | null = null;

    const toFixed = (v: number) => v.toFixed(prec);
    const getG = (s: string) => {
        const m = s.match(/\bG(\d+)\b/i);
        return m ? Number(m[1]) : undefined;
    };
    const withFeed = (line: string, f: number) => {
        if (/\bF-?\d*\.?\d+\b/i.test(line)) {
            return line.replace(/\bF-?\d*\.?\d+\b/i, `F${f}`);
        }
        const idx = line.indexOf("(");
        const before = idx === -1 ? line : line.slice(0, idx).trimEnd();
        const comment = idx === -1 ? "" : " " + line.slice(idx);
        return `${before} F${f}${comment}`;
    };
    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
        Math.hypot(b.x - a.x, b.y - a.y);

    for (const raw of lines) {
        const line = raw;

        if (!line.trim() || line.trim().startsWith("(")) {
            out.push(line);
            continue;
        }

        if (!motionRegex.test(line)) {
            out.push(line);
            continue;
        }

        const g = getG(line);
        if (g === undefined || (g !== 0 && g !== 1)) {
            out.push(line);
            continue;
        }

        const xm = line.match(xRe);
        const ym = line.match(yRe);
        const x = xm ? parseFloat(xm[1]) : undefined;
        const y = ym ? parseFloat(ym[1]) : undefined;

        // Rebuild motion line with new feedrate
        const cmd = `G${g}`;
        const commentIdx = line.indexOf("(");
        const comment = commentIdx >= 0 ? " " + line.slice(commentIdx) : "";
        const rebuiltBase =
            [cmd, x !== undefined ? `X${toFixed(x)}` : "", y !== undefined ? `Y${toFixed(y)}` : ""]
                .filter(Boolean)
                .join(" ") + comment;
        const rebuilt = withFeed(rebuiltBase, feedRate);

        // Add interpolation steps if needed
        if (stepSize > 0 && g === 1 && (x !== undefined || y !== undefined)) {
            const current = {
                x: x ?? (lastPoint?.x ?? 0),
                y: y ?? (lastPoint?.y ?? 0),
            };

            if (lastPoint) {
                const d = dist(lastPoint, current);
                if (d > stepSize) {
                    const steps = Math.ceil(d / stepSize);
                    for (let s = 1; s < steps; s++) {
                        const t = s / steps;
                        const px = lastPoint.x + (current.x - lastPoint.x) * t;
                        const py = lastPoint.y + (current.y - lastPoint.y) * t;
                        out.push(withFeed(`G1 X${toFixed(px)} Y${toFixed(py)}`, feedRate));
                    }
                }
            }

            out.push(rebuilt);
            lastPoint = current;
            continue;
        }

        if (x !== undefined || y !== undefined) {
            lastPoint = {
                x: x ?? (lastPoint?.x ?? 0),
                y: y ?? (lastPoint?.y ?? 0),
            };
        }

        out.push(rebuilt);
    }

    const result = out.join("\n");
    console.log(result);
    return result;
}

/**
 * Uses ONE feedrate you pass in (ignores any F values in the G-code).
 * Returns seconds & minutes of *cutting* time (G1 only).
 */
export function estimateCuttingTimeWithFixedFeed(
    gcode: string,
    feedRateMmMin: number
): { seconds: number; minutes: number } {
    const lines = gcode.split(/\r?\n/);

    const xRe = /\bX(-?\d*\.?\d+)/i;
    const yRe = /\bY(-?\d*\.?\d+)/i;

    let lastX: number | null = null;
    let lastY: number | null = null;

    let cuttingSec = 0;

    const getG = (s: string) => {
        const m = s.match(/\bG(\d+)\b/i);
        return m ? Number(m[1]) : undefined;
    };

    for (const raw of lines) {
        const line = raw.split("(")[0].trim(); // strip comments
        if (!line) continue;

        const g = getG(line);
        if (g !== 1) {
            // still record coords if present
            const xm = line.match(xRe);
            const ym = line.match(yRe);
            if (xm || ym) {
                lastX = xm ? parseFloat(xm[1]) : lastX;
                lastY = ym ? parseFloat(ym[1]) : lastY;
            }
            continue;
        }

        const xm = line.match(xRe);
        const ym = line.match(yRe);
        const x = xm ? parseFloat(xm[1]) : lastX;
        const y = ym ? parseFloat(ym[1]) : lastY;

        if (x == null || y == null) {
            lastX = x ?? lastX;
            lastY = y ?? lastY;
            continue;
        }

        if (lastX != null && lastY != null && (x !== lastX || y !== lastY)) {
            const dist = Math.hypot(x - lastX, y - lastY); // mm
            const segTimeSec = (dist / feedRateMmMin) * 60; // feed mm/min
            cuttingSec += segTimeSec;
        }

        lastX = x;
        lastY = y;
    }
    console.log("sec: "+cuttingSec+ "min :"+cuttingSec/60)
    return { seconds: cuttingSec, minutes: cuttingSec / 60 };
}

