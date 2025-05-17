import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "../api/axios";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchUnreadNotifications = useCallback(async () => {
    try {
      const res = await axios.get("/notifications/unread", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching unread notifications");
      setNotifications([]);
    }
  }, []);

  const markAsRead = useCallback(async (id) => {
    try {
      await axios.put(`/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error marking notification as read");
    }
  }, []);

  useEffect(() => {
    fetchUnreadNotifications();
  }, [fetchUnreadNotifications]);

  return (
    <NotificationContext.Provider value={{ notifications, fetchUnreadNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);