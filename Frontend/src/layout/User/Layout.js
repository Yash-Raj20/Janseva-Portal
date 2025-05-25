import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/User/Sidebar";
import { useEffect, useState } from "react";
import CustomLoader from "../../components/User/CustomLoader";

const Layout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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
           <CustomLoader />
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;