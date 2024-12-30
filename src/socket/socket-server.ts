import { Socket } from "socket.io";

const users = [] as any;
let rooms = [] as any;

const SocketServer = (socket: Socket, SocketServer: Socket) => {
  socket.on("joinUser", (user) => {
    users.push({
      id: user._id,
      socketId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    rooms = rooms.filter((room: any) => room.socketId !== socket.id);
  });
};

export { SocketServer };
