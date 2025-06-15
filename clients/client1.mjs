import net from "node:net";
import process from "node:process";

const client = net.createConnection({ port: 4000, host: "localhost" }, () => {
  console.log("[CLIENT] Connected. Please enter your nickname:");
});

let nicknameSet = false;

client.on("data", (buffer) => {
  const data = buffer.toString().trim();

  if (data === "BYE") {
    console.log("[CLIENT] Disconnected from chat.");
    client.end();
    process.stdin.pause();
    process.exit(0);
  } else {
    console.log(data);
  }
});

client.on("end", () => {
  console.log("[CLIENT] Server closed the connection.");
  process.stdin.pause();
  process.exit(0);
});

client.on("error", (err) => {
  console.log(`[CLIENT] Error: ${err.message}`);
  process.stdin.pause();
  process.exit(1);
});

process.stdin.on("data", (buffer) => {
  const message = buffer.toString().trim();
  client.write(message);
});
