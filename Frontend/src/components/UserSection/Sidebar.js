import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ links }) {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className="hover:underline">
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
