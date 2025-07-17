export function generateGCodeForCircle(
    radius: number,
    feedRate: number,
    stepSize: number
): string {
    const gcode: string[] = [];

    gcode.push("G21 ; Set units to mm");
    gcode.push("G90 ; Absolute positioning");
    gcode.push("G1 Z5.0 F500 ; Raise to safe height (out from foam)");
    gcode.push("G0 X0 Y0 ; Go to start (bottom center of circle)");
    gcode.push("G1 Z-1.0 F200 ; Cut depth into foam");
    gcode.push(`G1 F${feedRate}`);

    for (let angle = 0; angle <= 360; angle += stepSize) {
        const radians = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);
        gcode.push(`G1 X${x.toFixed(3)} Y${y.toFixed(3)}`);
    }

    gcode.push("G1 Z5.0 ; Pull out of foam");
    gcode.push("G0 X0 Y0 ; Return to origin");
    gcode.push("M30 ; End program");
    console.log(gcode);
    return gcode.join("\n");
}

//rectangle

export function generateRectangleGCode(
    width: number,
    height: number,
    feedRate: number
): string[] {
    return [
        "G21 ; Set units to mm",
        "G90 ; Absolute positioning",
        "G1 Z5.0 F500 ; Raise to safe height",
        "G0 X0 Y0 ; Move to origin",
        "G1 Z-1.0 F200 ; Cut depth into foam",
        `G1 X0 Y0 F${feedRate}`,
        `G1 X${width} Y0 F${feedRate}`,
        `G1 X${width} Y${height} F${feedRate}`,
        `G1 X0 Y${height} F${feedRate}`,
        `G1 X0 Y0 F${feedRate}`,
        "G1 Z5.0 ; Raise tool out of foam",
        "G0 X0 Y0 ; Return to origin",
        "M30 ; End program",
    ];
}

