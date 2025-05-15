import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const userLinks = [
  { name: 'Home', path: '/user' },
  { name: 'Report Issue', path: '/report' },
  { name: 'My Issues', path: '/user/issues' },
  { name: 'Profile', path: '/profile' },
];

function UserLayout() {
  return (
    <div className="flex">
      <Sidebar links={userLinks} />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
