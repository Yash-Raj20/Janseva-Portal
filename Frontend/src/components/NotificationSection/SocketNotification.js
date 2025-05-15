import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { useAuth } from "../../context/AuthContext"; // assuming you have useAuth hook

const SocketNotification = () => {
  const { token, userId } = useAuth(); // get from AuthContext
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token || !userId) return; // don't connect if no login

    const socket = io('http://localhost:5000', {
      auth: { token }, // you can pass token if needed
    });

    socketRef.current = socket;

    socket.emit('join', userId); // join specific user room

    socket.on('newNotification', (data) => {
      console.log('New notification received:', data);
      toast.success(data.message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token, userId]);

  return null; // no UI element
};

export default SocketNotification;
