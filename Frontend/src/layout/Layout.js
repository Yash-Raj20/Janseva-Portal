import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // your custom sidebar
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Layout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loader on route change
    setIsLoading(true);

    // Simulate loading delay (you can adjust or tie to actual data loading if possible)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen bg-cover bg-center bg-no-repeat pt-24 sm:pt-20 md:pt-24 lg:pt-28 font-poppins"
      style={{ backgroundImage: "url('/assets/PageBg.jpg')" }}
    >
      <Sidebar />
      <main className="flex-1 px-4 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-20">
            <FaSpinner className="animate-spin text-5xl text-green-700 mb-2" />
            <p className="text-green-700 text-lg font-semibold">Loading...</p>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;