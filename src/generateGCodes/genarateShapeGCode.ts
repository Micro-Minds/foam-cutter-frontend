export function generateGCodeForCircle(
    radius: number,
    feedRate: number,
    stepSize: number
): string {

    let gcode = "";

    gcode += "G21 ; Set units to mm\n";
    gcode += "G90 ; Absolute positioning\n";
    gcode += "G1 Z5.0 F500 ; Raise to safe height (out from foam)\n";
    gcode += "G0 X0 Y0 ; Go to start (bottom center of circle)\n";
    gcode += "G1 Z-1.0 F200 ; Cut depth into foam\n";
    gcode += `G1 F${feedRate}\n`;

    for (let angle = 0; angle <= 360; angle += stepSize) {
        const radians = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);
        gcode += `G1 X${x.toFixed(3)} Y${y.toFixed(3)}\n`;
    }

    gcode += "G1 Z5.0 ; Pull out of foam\n";
    gcode += "G0 X0 Y0 ; Return to origin\n";
    gcode += "M30 ; End program\n";

    console.log(gcode);

    return gcode;
}


//rectangle

export function generateRectangleGCode(
    width: number,
    height: number,
    feedRate: number
): string {
    return (
        "G21 ; Set units to mm\n" +
        "G90 ; Absolute positioning\n" +
        "G1 Z5.0 F500 ; Raise to safe height\n" +
        "G0 X0 Y0 ; Move to origin\n" +
        "G1 Z-1.0 F200 ; Cut depth into foam\n" +
        `G1 X0 Y0 F${feedRate}\n` +
        `G1 X${width} Y0 F${feedRate}\n` +
        `G1 X${width} Y${height} F${feedRate}\n` +
        `G1 X0 Y${height} F${feedRate}\n` +
        `G1 X0 Y0 F${feedRate}\n` +
        "G1 Z5.0 ; Raise tool out of foam\n" +
        "G0 X0 Y0 ; Return to origin\n" +
        "M30 ; End program\n"
    );
}



