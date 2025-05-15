import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout();
    navigate('/adminlogin'); 
  };

  return (
    <div className="h-screen w-52 flex flex-col bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
      <ul className="space-y-6 flex-grow">
        <li>
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-yellow-400">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
      </ul>

      {/* Logout button placed at the bottom */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 hover:text-yellow-400 mt-auto"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
