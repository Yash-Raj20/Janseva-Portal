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
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const location = useLocation();

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  const userName = profile?.user?.name || "User";

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      {/* Floating Toggle Icon (Small Screens Only) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-30"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-24 md:top-0 left-0 h-full bg-white md:bg-white lg:bg-transparent transition-all duration-300 z-20
        ${isCollapsed ? "w-0 overflow-hidden md:w-64" : "w-64"} md:min-h-screen`}
      >
        <div className="hidden md:flex items-center p-4 text-xl font-bold border-b text-[#0C2218]">
          <span className="ml-2">{userName}</span>' Dashboard
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                key={item.path}
                onClick={handleMenuClick}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#0C2218] text-white font-semibold"
                      : "text-gray-700 hover:bg-green-50 hover:text-[#0C2218]"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}