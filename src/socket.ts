/* eslint-disable no-console */
import { Server } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
// import { SocketMessage } from './app/modules/socket/socket.model';

// Store the io instance at module level
export let ioInstance: IOServer | null = null;

// Store online users
// const onlineUsers: Map<string, string> = new Map(); // socketId -> username

// Map userId to socketId
const userSocketMap: { [userId: string]: string } = {}; // userId -> socketId

export function initializeSocket(server: Server) {
  const io = new IOServer(server, {
    cors: {
      // origin: ['http://localhost:3000', 'http://10.10.20.41:5000'],
      origin: '*', // Adjust for production
      methods: ['GET', 'POST'],
    },
  });

  ioInstance = io; // Store the instance

  io.on('connection', (socket: Socket) => {
    console.log('A user connected', socket.id);

    const userId = socket.handshake.query.userId as string;

    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on('disconnect', () => {
      console.log('A user disconnected', socket.id);
      if (userId !== undefined) {
        delete userSocketMap[userId];
      }
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });

  return io;
}

export const getIO = () => {
  if (!ioInstance) {
    throw new Error(
      'Socket.io is not initialized. Call initializeSocket first.',
    );
  }
  return ioInstance;
};

export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}
