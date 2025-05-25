import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaUser, FaPowerOff } from "react-icons/fa";
import { useAuth } from "../../context/User/AuthContext";
import { useNotifications } from "../../context/User/NotificationContext";
import NotificationDropdown from "./NotificationBox";
import "./Hamburger.css";

const useOutsideClick = (ref, onClose) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
};

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { notifications } = useNotifications();
  const unreadCount = notifications.length;
  const { logout, user } = useAuth();

  useOutsideClick(menuRef, () => setOpen(false));

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
  };

  const mainMenuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about-us" },
    { label: "Problems", link: "/all-problems" },
    { label: "Raise Problem", link: "/submit" },
    { label: "Contact", link: "/contact-us" },
  ];

  const authMenuItems = user
    ? [
        {
          label: "Dashboard",
          link: "/dashboard",
          icon: <FaUser />,
          action: () => setOpen(false),
        },
        {
          label: "Logout",
          icon: <FaPowerOff />,
          action: () => {
            handleLogout();
          },
        },
      ]
    : [
        {
          label: "Login",
          link: "/login",
          icon: <FaSignInAlt />,
          action: () => setOpen(false),
        },
        {
          label: "Register",
          link: "/register",
          icon: <FaUserPlus />,
          action: () => setOpen(false),
        },
      ];

  return (
    <div
      className="lg:hidden relative z-50 flex items-center gap-4"
      ref={menuRef}
    >
      {/* Notification Bell */}
      {user && (
        <div className="relative">
          <NotificationDropdown />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      )}

      {/* Hamburger Toggle */}
      <input
        type="checkbox"
        className="menu"
        checked={open}
        onChange={toggleMenu}
        aria-label="Toggle menu"
      />

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-16 right-0 bg-white shadow-xl rounded-lg w-52 sm:w-60 p-5 flex flex-col space-y-4 z-50">
          {mainMenuItems.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              onClick={() => setOpen(false)}
              className="text-[#0C2218] hover:text-[#b89e37] font-medium transition"
            >
              {item.label}
            </Link>
          ))}

          {authMenuItems.map((item, index) =>
            item.link ? (
              <Link
                key={index}
                to={item.link}
                onClick={item.action}
                className="text-[#0C2218] hover:text-[#b89e37] font-medium transition flex items-center gap-2"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              <button
                key={index}
                onClick={item.action}
                className="text-[#0C2218] hover:text-[#b89e37] font-medium transition flex items-center gap-2"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
