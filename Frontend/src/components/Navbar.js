/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaSignInAlt,
  FaUserPlus,
  FaPowerOff,
  FaUser,
  FaBell,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { io } from "socket.io-client";
import HamburgerMenu from "./HamburgerMenu";

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

const UserMenu = ({ token, logout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#FFE26A] hover:bg-[#0C2218] text-black hover:text-white border border-[#FFE26A] flex items-center justify-center transition"
      >
        <FaUser className="text-lg md:text-xl" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-500 rounded-md shadow-lg z-20">
          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <FaUserPlus />
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
                <FaUser />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <FaPowerOff />
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
  const { token, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // const socket = io("http://localhost:5000");

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get("/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNotifications(res.data);
          setUnreadCount(res.data.filter((notif) => !notif.isRead).length);
        })
        .catch((err) => {
          console.error("Error fetching notifications:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     socket.on("newNotification", (data) => {
  //       setNotifications((prevNotifications) => [
  //         ...prevNotifications,
  //         data.message,
  //       ]);
  //       setUnreadCount((prevCount) => prevCount + 1);
  //     });
  //   }
  //   return () => {
  //     socket.off("newNotification");
  //   };
  // }, [token, socket]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
            src="./Logo/signature.svg"
            alt="JanSeva Portal"
            className="h-8 md:h-10 w-auto object-cover"
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
          <Link to="/all-problems" className="hover:text-[#b89e37] transition">
            Problems
          </Link>
          <Link to="/submit" className="hover:text-[#b89e37] transition">
            Raise Problem
          </Link>
          <Link to="/contact-us" className="hover:text-[#b89e37] transition">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-4">
          <HamburgerMenu />

          {/* Right-side actions - hidden on mobile */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 uppercase">
            {token && (
              <Link
                to="/notifications"
                className="relative flex items-center hover:text-[#b89e37]"
              >
                <FaBell className="text-lg md:text-xl" />
                {loading ? null : unreadCount > 0 ? (
                  <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                    {unreadCount}
                  </span>
                ) : null}
              </Link>
            )}
            <Link
              to="/all-community"
              className="bg-[#FFE26A] hover:bg-[#0C2218] text-[14px] md:text-[16px] text-black hover:text-white border border-[#FFE26A] font-medium py-1.5 px-3 md:py-2 md:px-4 transition"
            >
              Join Community
            </Link>
            <UserMenu token={token} logout={logout} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
