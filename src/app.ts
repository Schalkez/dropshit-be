import express from "express";
import cors from "cors";
import "./database"; // initialize database
import routes from "./routes";
import { Server } from "http";
import { Socket } from "socket.io";
import { SocketServer } from "./socket/socket-server";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "./configfb/fcmmess-4c2c4-a71320874f3d.json";
import { config } from "dotenv";

config();

// export const bot = new TelegramBot(apiToken, { polling: true });
// bot.sendMessage("-4205735222", "TEST bot chat 1212121");
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use((req, res, next) => {
  console.log("******** Endpoint ********: ", req.path);
  next();
});

// Routes
app.use("/api/", routes);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const httpServer: Server = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

const user: {
  [key: string]: {
    socket_id: string;
  };
} = {};

io.on("connection", (socket: Socket) => {
  const userId = socket.handshake.auth._id;
  console.log(`user ${userId} connected`);

  user[userId] = {
    socket_id: socket.id,
  };

  socket.on("private message", (data) => {
    const receiverSocketId = user[data.to]?.socket_id;

    if (!receiverSocketId) {
      return;
    }

    socket.to(receiverSocketId).emit("receive private message", {
      content: data.content,
      from: userId,
    });
  });

  socket.on("view message", (data) => {
    console.log("XEM TIN NHẮN RỒI");
    const receiverSocketId = user[data.to].socket_id;
    socket.to(receiverSocketId).emit("receive view message", {
      from: userId,
    });
  });

  socket.on("order", (data) => {
    const receiverSocketId = user[data.to]?.socket_id;

    socket.to(receiverSocketId).emit("receive order", {
      data,
    });
  });

  socket.on("disconnect", () => {
    delete user[userId];
    console.log(`user ${userId} disconnect`);
  });
  SocketServer(socket, io);
});

export default httpServer;
