export async function sendGcodeToESP(gcode: string[]): Promise<void> {
    const espUrl = "ws://192.168.8.103:81";

    return new Promise<void>((resolve, reject) => {
        const socket = new WebSocket(espUrl);

        socket.onopen = async () => {
            console.log("✅ WebSocket connected to ESP32");

            try {
                for (let i = 0; i < gcode.length; i++) {
                    const line = gcode[i];
                    console.log(`🔄 Sending line ${i + 1}: ${line}`);
                    socket.send(line);
                    await new Promise(res => setTimeout(res, 200)); // 200ms delay
                }
                socket.close();
            } catch (err) {
                console.error("🚨 Error while sending G-code:", err);
                socket.close(); // Close on failure
                reject(err);
            }
        };

        socket.onclose = () => {
            console.log("🛑 WebSocket closed");
            resolve();
        };

        socket.onerror = (err) => {
            console.error("❌ WebSocket error:", err);
            reject(err);
        };
    });
}
