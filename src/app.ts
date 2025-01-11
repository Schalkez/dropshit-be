import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import TelegramBot, { Message } from "node-telegram-bot-api";
import "./database"; // initialize database
import routes from "./routes";
import { Server } from "http";
import { Socket } from "socket.io";
import { SocketServer } from "./socket/socket-server";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "./configfb/fcmmess-4c2c4-a71320874f3d.json";
import { apiToken } from "./config";
import UserRepo from "./database/repository/UserRepo";
import { forEach } from "lodash";
import User from "./database/model/User";
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
// Socket
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

  user[userId] = {
    socket_id: socket.id,
  };

  socket.on("private message", (data) => {
    const receiverSocketId = user[data.to].socket_id;
    socket.to(receiverSocketId).emit("receive private message", {
      content: data.content,
      from: userId,
    });
  });

  socket.on("disconnect", () => {
    delete user[userId];
    console.log(`user ${socket.id} disconnect`);
  });
  SocketServer(socket, io);
});

export default httpServer;
