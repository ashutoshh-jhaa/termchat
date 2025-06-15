import net from "node:net";
import process from "node:process";

const PORT = 4000;
const clients = new Map(); // socket -> nickname

const server = net.createServer((socket) => {
  socket.write("Enter your nickname: ");

  let nickname = null;

  socket.on("data", (buffer) => {
    const input = buffer.toString().trim();

    // First message should be nickname
    if (!nickname) {
      nickname = input || `User${clients.size + 1}`;
      clients.set(socket, nickname);
      console.log(`[SERVER] ${nickname} joined the chat.`);

      socket.write(`[SYSTEM] Welcome, ${nickname}! Type 'exit' to leave.\n`);
      broadcast(`[SYSTEM] ${nickname} joined the chat.`, socket);
      return;
    }

    // If 'exit', close client and broadcast this to other clients
    if (input === "exit") {
      const message = `[SERVER] '${nickname}' left the chat`
      console.log(message);
      broadcast(message, socket)
      clients.delete(socket);
      socket.end();
      return;
    }

    // Broadcast message to others
    const message = `[${nickname}] said: ${input}`;
    broadcast(message, socket);
  });

  socket.on("end", () => {
    if (nickname) {
      console.log(`[SERVER] ${nickname} left.`);
      broadcast(`[SYSTEM] ${nickname} left the chat.`, socket);
    }
    clients.delete(socket);
  });

  //this error gets triggered when client diconnects all of sudden without informing
  socket.on("error", (err) => {
    // console.log(`[SERVER] Error with ${nickname || 'unknown'}: ${err.message}`);
    // console.log(clients.get(socket),"left")
  });
});

function broadcast(message, sender) {
  for (const [client, name] of clients) {
    //ignore the sender
    if (client !== sender) {
      client.write(message + "\n");
    }
  }
}

server.listen(PORT, () => {
  console.log(`[SERVER] Listening on port ${PORT}...`);
});