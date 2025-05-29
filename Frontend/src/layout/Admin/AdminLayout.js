import Navbar from "../../components/Admin/AdminSection/Navbar";
import Sidebar from "../../components/Admin/AdminSection/AdminSidebar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">
          {children}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
