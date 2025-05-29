// src/components/Sidebar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Bug, Settings, LogOut } from "lucide-react";
import { useAdminAuth } from "../../../context/Admin/AuthContext";

const links = [
  { to: "/admin-dashboard", label: "Dashboard", icon: <Home size={18} /> },
  {
    to: "/admin-dashboard/users",
    label: "Manage Users",
    icon: <Users size={18} />,
  },
  {
    to: "/admin-dashboard/problems",
    label: "Manage Problems",
    icon: <Bug size={18} />,
  },
  {
    to: "/admin-dashboard/settings",
    label: "Settings",
    icon: <Settings size={18} />,
  },
];

export default function Sidebar() {
  const location = useLocation();

  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="h-screen w-64 bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
              location.pathname === link.to ? "bg-gray-300 font-semibold" : ""
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </div>
  );
}
