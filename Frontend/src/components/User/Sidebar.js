/* eslint-disable no-unused-vars */
import {
  LayoutDashboard,
  User,
  AlertCircle,
  CheckCircle,
  Bell,
  FilePlus,
  MessageCircle,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/User/AuthContext";
import { useEffect, useState } from "react";
import axios from "../../api/User/axios";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { label: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
    { label: "My Issues", icon: <AlertCircle size={20} />, path: "/dashboard/my-issues" },
    { label: "Solved Issues", icon: <CheckCircle size={20} />, path: "/dashboard/solved-issues" },
    { label: "Notifications", icon: <Bell size={20} />, path: "/dashboard/notifications" },
    { label: "Report a Problem", icon: <FilePlus size={20} />, path: "/submit" },
    { label: "Messages", icon: <MessageCircle size={20} />, path: "/dashboard/messages" },
    { label: "Help / Feedback", icon: <HelpCircle size={20} />, path: "/dashboard/help" },
    { label: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
    { label: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  const [profile, setProfile] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    axios
      .get("/auth/profile", { withCredentials: true })
      .then((res) => {
        setProfile(res.data.user || res.data);
        setError(null);
      })
      .catch(() => {
        setProfile(null);
        setError("Failed to load profile. Please try again later.");
      });
  }, [user]);

  const userName = profile?.name || user?.name || "User";

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-30"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-24 md:top-0 left-0 h-full bg-white md:bg-white lg:bg-transparent transition-all duration-300 z-20
        ${isCollapsed ? "w-0 overflow-hidden md:w-64" : "w-64"} md:min-h-screen`}
      >
        <div className="md:flex items-center p-4 border-b text-[#0C2218] gap-2">
          <span
            className="font-bold truncate max-w-[200px] md:max-w-[250px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
            title={userName}
          >
            {userName}
          </span>
          <span className="font-semibold whitespace-nowrap text-lg">Dashboard</span>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map(({ label, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                to={path}
                key={path}
                onClick={handleMenuClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-[#0C2218] text-white font-semibold"
                    : "text-gray-700 hover:bg-green-50 hover:text-[#0C2218]"
                  }
                `}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}