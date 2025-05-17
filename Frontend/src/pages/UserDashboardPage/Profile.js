/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaTasks, FaCheckCircle } from 'react-icons/fa';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  if (!profile) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-red-600">
        Failed to load profile. Please try again later.
      </div>
    );
  }

  const { user, problems = [] } = profile;
  const pendingCount = problems.filter(p => p.status !== 'Resolved').length;
  const solvedCount = problems.filter(p => p.status === 'Resolved').length;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl text-[#0C2218]">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0C2218&color=fff&size=128`}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-600">Active JanSeva Portal</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow icon={<FaEnvelope />} label="Email" value={user.email} />
        <InfoRow icon={<FaPhone />} label="Phone" value={user.phone || "N/A"} />
        <InfoRow icon={<FaMapMarkerAlt />} label="Location" value={user.location || "Not specified"} />
        <InfoRow icon={<FaCalendarAlt />} label="Joined" value={new Date(user.createdAt).toLocaleDateString()} />
      </div>

      {/* Activity Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard title="Issues Raised" count={problems.length} icon={<FaTasks />} color="bg-yellow-100" />
        <StatCard title="Issues Solved" count={solvedCount} icon={<FaCheckCircle />} color="bg-green-100" />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="text-lg text-green-700">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, color }) {
  return (
    <div className={`p-5 rounded-xl shadow-md ${color} flex items-center gap-4`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
}