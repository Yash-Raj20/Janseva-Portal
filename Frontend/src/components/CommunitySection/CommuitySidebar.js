import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-darkBlue text-white w-64 min-h-screen p-6 fixed">
      <h2 className="text-2xl font-bold mb-10">Community</h2>
      <nav className="flex flex-col gap-6">
        <Link to="/dashboard" className="hover:text-primary">Home</Link>
        <Link to="/dashboard/tasks" className="hover:text-primary">Tasks</Link>
        <Link to="/dashboard/submit-proof" className="hover:text-primary">Submit Proof</Link>
        <Link to="/dashboard/my-tasks" className="hover:text-primary">My Tasks</Link>
        <Link to="/dashboard/profile" className="hover:text-primary">Profile</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
