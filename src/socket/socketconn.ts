/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server as HTTPServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import { UserModel } from '../modules/User/user.model';


let io: IOServer;

const initializeSocket = (server: HTTPServer) => {
  if (!io) {
    io = new IOServer(server, {
      pingTimeout: 60000,
      cors: {
        origin: ['http://localhost:3000', 'http://10.10.20.13:5000'],
      },
    });
    // online user
    const onlineUser = new Set();
    io.on('connection', async (socket: Socket) => {
      const userId = socket.handshake.query.id as string;
      if (!userId) {
        return;
      }
      const currentUser = await UserModel.findById(userId);
      if (!currentUser) {
        return;
      }
      const currentUserId = currentUser?._id.toString();
      // create a room-------------------------
      socket.join(currentUserId as string);
      // set online user
      onlineUser.add(currentUserId);
      // send to the client
      io.emit('onlineUser', Array.from(onlineUser));
      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });
  }
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized. Call initializeSocket first.');
  }
  return io;
};

export { getIO, initializeSocket };