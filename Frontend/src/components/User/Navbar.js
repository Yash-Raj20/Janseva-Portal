/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/User/AuthContext";
import NotificationDropdown from "./NotificationBox";
import { FaUser } from "react-icons/fa";
import { LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useNotifications } from "../../context/User/NotificationContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "./../Tooltip";

const useOutsideClick = (ref, onClose) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
};

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-[#b89e37] transition duration-300 ease-in-out"
      >
        {title}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white text-gray-500 rounded shadow-lg z-10 w-60">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const UserMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useOutsideClick(menuRef, () => setOpen(false));

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt="Profile"
          onClick={() => setOpen(!open)}
          className="w-10 h-10 md:w-10 md:h-10 rounded-full object-cover cursor-pointer border-2 border-[#0C2218] transition"
        />
      ) : (
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-[#FFE26A] hover:bg-[#0C2218] text-black hover:text-white border border-[#FFE26A] flex items-center justify-center transition cursor-pointer"
        >
          <FaUser className="text-lg md:text-xl" />
        </div>
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-500 rounded-md shadow-lg z-20">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <LogIn />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <UserPlus />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <LogOut />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const { notifications } = useNotifications();
  const unreadCount = notifications.length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-10 lg:px-20 py-3 md:py-4 transition-all duration-500 font-poppins ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-extrabold text-black flex items-center space-x-2"
          >
            <img
              src="/Logo/signature.svg"
              alt="JanSeva Portal"
              className="h-8 md:h-10 w-auto object-cover"
              loading="lazy"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 xl:gap-10 uppercase text-[14px] md:text-[16px] text-[#0C2218] font-normal">
            <Link to="/" className="hover:text-[#b89e37] transition">
              Home
            </Link>
            <Link to="/about-us" className="hover:text-[#b89e37] transition">
              About
            </Link>
            <Link
              to="/all-problems"
              className="hover:text-[#b89e37] transition"
            >
              Problems
            </Link>
            <Link to="/submit" className="hover:text-[#b89e37] transition">
              Raise Problem
            </Link>
            <Link to="/contact-us" className="hover:text-[#b89e37] transition">
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <HamburgerMenu />

            <div className="hidden lg:flex items-center gap-4 xl:gap-6 uppercase">
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

              <Tooltip text="Join Community">
                <Link
                  to="/all-community"
                  className="bg-[#FFE26A] hover:bg-[#0C2218] text-[14px] md:text-[16px] text-black hover:text-white border border-[#FFE26A] font-medium py-1.5 px-3 md:py-2 md:px-4 transition"
                >
                  Join Community
                </Link>
              </Tooltip>

              <Tooltip text="Your Profile">
                <UserMenu user={user} />
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Navbar;
