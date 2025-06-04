import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useNotifications } from "../../context/User/NotificationContext";
import Tooltip from "../Tooltip";

export default function NotificationBox({ unreadCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const { notifications, fetchUnreadNotifications } = useNotifications();

  useEffect(() => {
    fetchUnreadNotifications();
  }, [fetchUnreadNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (id) => {
    setIsOpen(false);
    navigate(`/dashboard/notifications?highlight=${id}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip text="Notifications">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-[#0C2218]" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold min-w-[18px] h-5 rounded-full flex items-center justify-center px-1.5">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>
      </Tooltip>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-xl rounded-lg w-72 sm:w-72 lg:w-96 p-5 flex flex-col space-y-4 z-50">
          <div className="text-[#0C2218] text-base font-semibold border-b pb-2">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <div className="text-sm text-gray-500">Empty notifications.</div>
          ) : (
            notifications.slice(0, 5).map((n) => (
              <div
                key={n._id}
                onClick={() => handleNotificationClick(n._id)}
                className="cursor-pointer text-[#0C2218] border-b last:border-none pb-2 hover:bg-gray-100 p-2 rounded transition"
              >
                <div className="text-sm font-medium truncate">{n.message}</div>
                <div className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}

          <div className="">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/dashboard/notifications");
              }}
              className="text-blue-600 text-sm hover:underline text-right w-full"
            >
              View all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}