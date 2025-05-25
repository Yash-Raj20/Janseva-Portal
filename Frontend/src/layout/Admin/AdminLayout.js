import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
