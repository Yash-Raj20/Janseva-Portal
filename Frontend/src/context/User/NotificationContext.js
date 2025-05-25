import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "../../api/User/axios";
import { useAuth } from "../../context/User/AuthContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const fetchUnreadNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get("/notifications/unread", {
        withCredentials: true,
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching unread notifications");
      setNotifications([]);
    }
  }, [user]);

  useEffect(() => {
    fetchUnreadNotifications();
  }, [fetchUnreadNotifications]);

  const markAsRead = useCallback(async (id) => {
    try {
      await axios.put(`/notifications/${id}/read`, {}, {
        withCredentials: true,
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error marking notification as read");
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, fetchUnreadNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);