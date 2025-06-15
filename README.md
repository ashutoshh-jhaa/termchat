# TermChat

**TermChat** is a simple terminal-based multi-client chat application built using **Node.js** and **TCP sockets** (`net` module). It allows multiple users to connect, choose nicknames, and chat in real time via the command line.

---

## Features

- Multi-client support (multiple users can connect at the same time)
- Each user sets a nickname on connection
- Real-time message broadcasting to all connected clients
- Graceful disconnect using `exit`
- Clean message formatting
- Server and client error handling

---

## How It Works

- The **server** listens on a port (default: `4000`) and accepts incoming TCP connections.
- Each **client** connects to the server, chooses a nickname, and can send/receive messages.
- The server broadcasts messages from one client to all others.
- Typing `exit` ends the session cleanly.

---

## Setup & Usage

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/termchat.git
cd termchat
```

### 2. Run the Server
```bash
node server.js
```

### 3. Run One or More Clients (in separate terminals)
```bash
node client.js
```
- Enter a nickname when prompted, and start chatting.
To leave the chat, type:

```bash
exit
```

## Requirements
- Node.js 14 or later

## Example
```bash
[SERVER] Listening on port 4000...
[CLIENT] Connected. Please enter your nickname:
John
[SYSTEM] Welcome, John! Type 'exit' to leave.
[Jane] said: Hello everyone!
[John] said: Hi Jane!
```

## Future Enhancements
 - Direct messages
 - Colored terminal messages
 - Chat history or logging
 - Authentication

## License
This project is licensed under the MIT License.

## Author
Ashutosh Jha - [GitHub Profile](https://github.com/ashutoshh-jhaa)