import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/User/AuthContext";
import NotificationDropdown from "./NotificationBox";
import { FaUser } from "react-icons/fa";
import { LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { useEffect, useState, useRef, memo } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useNotifications } from "../../context/User/NotificationContext";
import Tooltip from "./../Tooltip";

// ✅ Custom Hook
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

// ✅ User Menu Component
const UserMenu = memo(({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useOutsideClick(menuRef, () => setOpen(false));

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt="Profile"
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-[#0C2218] transition"
          loading="lazy"
        />
      ) : (
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-[#FFE26A] hover:bg-[#0C2218] text-black hover:text-white border border-[#FFE26A] flex items-center justify-center transition cursor-pointer"
          role="button"
        >
          <FaUser className="text-lg" />
        </div>
      )}

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-500 rounded-md shadow-lg z-20">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <UserPlus size={18} /> Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
});

// ✅ Main Navbar
const Navbar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const { notifications } = useNotifications();
  const unreadCount = notifications.length;
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 mx-4 md:mx-10 py-3 px-4 sm:px-6 md:px-10 lg:px-20 transition-all duration-500 font-poppins rounded-xl shadow-md ${
        scrolled
          ? "bg-white shadow-md"
          : "backdrop-blur-sm bg-white/20 border border-white/20"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-extrabold flex items-center space-x-2">
          <img
            src={
              isHomePage
                ? scrolled
                  ? "/Logo/signature.svg"
                  : "/Logo/SignatureWhite.svg"
                : "/Logo/signature.svg"
            }
            alt="JanSeva Portal"
            className="h-8 md:h-10 w-auto object-cover transition-all duration-500"
            loading="lazy"
          />
        </Link>

        {/* Desktop Menu */}
        <div
          className={`hidden lg:flex gap-6 xl:gap-10 uppercase text-[14px] md:text-[16px] font-normal ${
            isHomePage
              ? scrolled
                ? "text-[#0C2218]"
                : "text-white"
              : "text-[#0C2218]"
          }`}
        >
          {["Home", "About", "Problems", "Raise Problem", "Contact"].map(
            (label, idx) => {
              const links = ["/", "/about-us", "/all-problems", "/submit", "/contact-us"];
              return (
                <Link
                  key={idx}
                  to={links[idx]}
                  className="hover:text-[#b89e37] transition"
                >
                  {label}
                </Link>
              );
            }
          )}
        </div>

        {/* Right Side */}
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
                className="bg-[#FFE26A] hover:bg-[#0C2218] text-[14px] md:text-[16px] text-black hover:text-white border border-[#FFE26A] rounded-md font-medium py-1.5 px-3 md:py-2 md:px-4 transition"
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
  );
};

export default memo(Navbar);