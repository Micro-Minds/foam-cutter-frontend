export function generateCircleGCode(
    radius: number,
    feedRate: number,
    stepSize: number
): string[] {
    const gcode: string[] = [
        "G21 ; Set units to mm",
        "G90 ; Absolute positioning",
        "G1 Z5.0 F500 ; Raise to safe height",
        "G0 X0 Y0 ; Move to origin",
        "G1 Z-1.0 F200 ; Lower to cutting depth",
        `G1 F${feedRate} ; Set feed rate`,
    ];

    for (let angle = 0; angle < 360; angle += stepSize) {
        const radians = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);
        gcode.push(`G1 X${x.toFixed(3)} Y${y.toFixed(3)}`);
    }

    // Close the circle by returning to the starting point
    gcode.push(`G1 X${radius.toFixed(3)} Y0.000`);

    gcode.push("G1 Z5.0 ; Raise to safe height");
    gcode.push("G0 X0 Y0 ; Return to origin");
    gcode.push("M30 ; End program");
    return gcode;
}

//rectangle

export function generateRectangleGCode(
    length: number,
    breadth: number,
    feedRate: number
): string[] {
    return [
        "G21 ; Set units to mm",
        "G90 ; Absolute positioning",
        "G1 Z5.0 F500 ; Raise to safe height",
        "G0 X0 Y0 ; Move to origin",
        "G1 Z-1.0 F200 ; Lower to cutting depth",
        `G1 X0 Y0 F${feedRate}`,
        `G1 X${length} Y0 F${feedRate}`,
        `G1 X${length} Y${breadth} F${feedRate}`,
        `G1 X0 Y${breadth} F${feedRate}`,
        `G1 X0 Y0 F${feedRate}`,
        "G1 Z5.0 ; Raise to safe height",
        "G0 X0 Y0 ; Return to origin",
        "M30 ; End program",
    ];
}
