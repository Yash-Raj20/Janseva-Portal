import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaUser, FaPowerOff } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
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
  const { token, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setOpen(false));

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about-us" },
    { label: "Problems", link: "/all-problems" },
    { label: "Raise Problem", link: "/submit" },
    { label: "Contact", link: "/contact-us" },
  ];

  return (
    <div className="lg:hidden relative z-50" ref={menuRef}>
      {/* Custom animated hamburger menu */}
      <input
        type="checkbox"
        className="menu"
        checked={open}
        onChange={() => setOpen(!open)}
        aria-label="Toggle Menu"
      />

      {open && (
        <div className="absolute top-16 right-0 bg-white shadow-xl rounded-lg w-48 p-5 flex flex-col space-y-4">
          {/* Render main menu items */}
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              onClick={() => setOpen(false)}
              className="text-[#0C2218] hover:text-[#b89e37] font-medium transition"
            >
              {item.label}
            </Link>
          ))}

          {/* User Menu (Login/Register or Dashboard/Logout) */}
          {token ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-[#0C2218] hover:text-[#b89e37] flex items-center space-x-2 font-medium transition"
              >
                <FaUser />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-[#0C2218] hover:text-[#b89e37] font-medium transition flex items-center space-x-2"
              >
                <FaPowerOff />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-[#0C2218] hover:text-[#b89e37] font-medium transition flex items-center space-x-2"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="text-[#0C2218] hover:text-[#b89e37] font-medium transition flex items-center space-x-2"
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;