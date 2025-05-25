import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { useAuth } from "../../../context/User/AuthContext";

const SocketNotification = () => {
  const { user } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user || !user._id) return; 

    const socket = io('http://localhost:5000', {
      auth: { userId: user._id },
    });

    socketRef.current = socket;

    socket.emit('join', user._id); 

    socket.on('newNotification', (data) => {
      console.log('New notification received:', data);
      toast.success(data.message || "You have a new notification!");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  return null;
};

export default SocketNotification;