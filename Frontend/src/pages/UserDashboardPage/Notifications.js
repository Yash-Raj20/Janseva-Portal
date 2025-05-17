import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useLocation } from "react-router-dom";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const { token } = useAuth();
  const { markAsRead } = useNotifications();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const highlightId = queryParams.get("highlight");

  const notificationRefs = useRef({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchNotifications();
  }, [token]);

  useEffect(() => {
    if (highlightId && notificationRefs.current[highlightId]) {
      const el = notificationRefs.current[highlightId];
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("animate-blink");

      setTimeout(() => {
        el.classList.remove("animate-blink");
      }, 2000);
    }
  }, [highlightId, notifications]);

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = notifications.slice(startIndex, endIndex);
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#0C2218]">🔔 Notifications</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex flex-col gap-4">
        {currentNotifications.length === 0 ? (
          <div>No notifications yet!</div>
        ) : (
          currentNotifications.map((n) => (
            <div
              key={n._id}
              ref={(el) => (notificationRefs.current[n._id] = el)}
              className={`p-4 rounded-xl shadow transition-all ${
                n.isRead ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <p>{n.message}</p>
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n._id)}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-[#0C2218] text-white font-bold"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;