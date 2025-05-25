import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-green-700 text-white p-6 space-y-8 min-h-screen">
      <div className="text-2xl font-bold mb-10">JanSeva Admin</div>
      <nav className="flex flex-col space-y-4">
        <Link to="/">Dashboard</Link>
        <Link to="/assigned">Assigned Problems</Link>
        <Link to="/resolved">Resolved Problems</Link>
        <Link to="/volunteers">Volunteers</Link>
        <Link to="/login">Logout</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
