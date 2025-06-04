/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
import axios from "../../api/User/axios";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    { label: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
    {
      label: "My Issues",
      icon: <AlertCircle size={20} />,
      path: "/dashboard/my-issues",
    },
    {
      label: "Solved Issues",
      icon: <CheckCircle size={20} />,
      path: "/dashboard/solved-issues",
    },
    {
      label: "Notifications",
      icon: <Bell size={20} />,
      path: "/dashboard/notifications",
    },
    {
      label: "Report a Problem",
      icon: <FilePlus size={20} />,
      path: "/submit",
    },
    {
      label: "Messages",
      icon: <MessageCircle size={20} />,
      path: "/dashboard/messages",
    },
    {
      label: "Help / Feedback",
      icon: <HelpCircle size={20} />,
      path: "/dashboard/help",
    },
    {
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
    { label: "Logout", icon: <LogOut size={20} />, path: "/logout" },
  ];

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-1/2 left-2 transform -translate-y-1/2 bg-[#0C2218] text-white p-2 rounded-full shadow-md z-30"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      <aside
        className={`
        fixed lg:static top-24 lg:top-0 left-0
        ${isCollapsed ? "w-0 overflow-hidden" : "w-64"} 
        lg:w-64
        h-[calc(100vh-6rem)] lg:h-auto
        bg-white lg:bg-transparent 
        z-20 transition-all duration-300
        overflow-y-auto hide-scrollbar
      `}
      >
        <div className="flex items-center p-4 border-b text-[#0C2218] gap-2">
          <span
            className={`
        font-bold truncate max-w-[150px] lg:max-w-[250px]
        ${isCollapsed ? "hidden lg:inline" : "block"}
      `}
            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            title={userName}
          >
            {userName}
          </span>

          <span
            className={`
        font-semibold whitespace-nowrap text-lg
        ${isCollapsed ? "hidden lg:inline" : "block"}
      `}
          >
            Dashboard
          </span>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map(({ label, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                to={path}
                key={path}
                onClick={handleMenuClick}
                className={`
            flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
            ${
              isActive
                ? "bg-[#0C2218] text-white font-semibold"
                : "text-gray-700 hover:bg-green-50 hover:text-[#0C2218]"
            }
          `}
              >
                {icon}
                <span
                  className={`${isCollapsed ? "hidden lg:inline" : "inline"}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
