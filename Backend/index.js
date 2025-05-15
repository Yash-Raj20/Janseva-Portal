import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io'; 

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoute.js';
import { createNotification } from './controllers/notifyController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json());


app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/notifications', notificationRoutes);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

export { io };

// Socket.io event handling
io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);

  socket.on('sendNotification', async ({ userId, message }) => {
    await createNotification(userId, message);
    socket.emit('newNotification', { userId, message });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:", socket.id');
  });
});

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
