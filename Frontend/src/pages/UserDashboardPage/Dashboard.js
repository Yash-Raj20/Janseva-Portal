import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUser, FaBell, FaTasks, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function DashboardHome() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setProfile(res.data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-green-700 text-lg font-medium">
          <FaSpinner className="animate-spin text-4xl" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load dashboard. Please try again later.
      </div>
    );
  }

  const { user, problems = [], notifications = [] } = profile;
  const pendingCount = problems.filter(p => p.status !== 'Resolved').length;
  const solvedCount = problems.filter(p => p.status === 'Resolved').length;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-100 to-white text-[#0C2218]">
      {/* Welcome Banner */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-start">Welcome, {user.name} 👋</h1>
        <p className="text-gray-600 mt-2 text-start">Here’s an overview of your JanSeva activity.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard title="Pending Issues" count={pendingCount} icon={<FaTasks />} color="bg-yellow-200" />
        <StatCard title="Solved Issues" count={solvedCount} icon={<FaCheckCircle />} color="bg-green-200" />
        <StatCard title="Notifications" count={notifications.length} icon={<FaBell />} color="bg-purple-200" />
        <StatCard title="My Profile" count="1" icon={<FaUser />} color="bg-blue-200" />
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NavCard title="My Profile" link="/dashboard/profile" icon={<FaUser />} />
        <NavCard title="My Issues" link="/dashboard/my-issues" icon={<FaTasks />} />
        <NavCard title="Solved Issues" link="/dashboard/solved-issues" icon={<FaCheckCircle />} />
        <NavCard title="Notifications" link="/dashboard/notifications" icon={<FaBell />} />
      </div>
    </div>
  );
}

// Reusable Stat Card
function StatCard({ title, count, icon, color }) {
  return (
    <div className={`p-4 rounded-xl shadow-md ${color} flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-2 md:gap-4`}>
      <div className="text-xl md:text-3xl">{icon}</div>
      <div>
        <h4 className="text-sm md:text-xl font-semibold">{title}</h4>
        <p className="text-lg md:text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}

// Reusable Navigation Card
function NavCard({ title, link, icon }) {
  return (
    <Link to={link} className="block">
      <div className="p-4 bg-white hover:bg-green-50 border border-green-100 rounded-xl shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center gap-2 md:items-start md:text-left">
        <div className="text-xl md:text-2xl text-[#0C2218]">{icon}</div>
        <h4 className="text-sm md:text-lg font-semibold text-[#0C2218]">{title}</h4>
      </div>
    </Link>
  );
}