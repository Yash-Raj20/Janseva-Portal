import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-white shadow-md px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <p className="text-gray-600">Hello, Admin</p>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full h-10 w-10 object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
