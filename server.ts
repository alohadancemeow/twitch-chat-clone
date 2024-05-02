import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { Author } from "@/utils/models";
import { generateMessage, generateUser } from "@/utils/helpers";
import { Profanity } from "@2toad/profanity";
import { ChatBot } from "./lib/chat-bot";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, { cors: { origin: ["*"] } });

  const users = new Map<string, Author>();
  const profanity = new Profanity({
    grawlixChar: "*",
    wholeWord: true,
    grawlix: "****",
  });

  io.on("connection", (socket) => {
    const id = socket.id;
    console.log("a user connected: ", id);

    const user = users.get(id) ?? generateUser();
    users.set(id, user);

    socket.on("disconnect", () => {
      console.log("user disconnected: ", id);
      users.delete(id);
    });

    socket.on("message", (message: string) => {
      console.log(`Received message ${message} from ${user.username}`);
      const filteredMessage = profanity.censor(message);
      io.emit(
        "new-message",
        generateMessage({ content: filteredMessage, author: user })
      );
    });
  });

  const chatBot = ChatBot({ socket: io });
  chatBot.start();

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
