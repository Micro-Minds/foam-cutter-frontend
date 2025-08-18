export async function sendGcodeToESP(gcode: string): Promise<void> {
    const espUrl = "http://192.168.8.131/api/gcode";


    const normalizedGcode = gcode.trim().replace(/\r\n/g, "\n");

    const response = await fetch(espUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        },
        body: normalizedGcode
    });

    if (!response.ok) {
        throw new Error("Failed to send G-code: ${response.statusText}");
    }

    const text = await response.text();
    console.log("Response from ESP32:", text);
}