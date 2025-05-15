import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const { token } = useAuth(); // Retrieve the token from the AuthContext

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Ensure you send the token in the Authorization header
        const res = await axios.get("/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        setError("Failed to fetch notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchNotifications(); // Only fetch if the token is available
    }
  }, [token]); // Re-fetch notifications if the token changes

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request to mark as read
          },
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      setError("Failed to mark notification as read. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading notifications...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        🔔 Notifications
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <div>No notifications yet!</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-xl shadow ${
                n.isRead ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <p>{n.message}</p>
                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
