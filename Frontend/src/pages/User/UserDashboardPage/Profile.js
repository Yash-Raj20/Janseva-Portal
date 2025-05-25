/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/User/AuthContext";
import axios from "../../../api/User/axios";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    axios
      .get("/auth/profile", { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
        setError(null);
      })
      .catch(() => {
        setProfile(null);
        setError("Failed to load profile. Please try again later.");
      })
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-gray-600">
        Please log in to view your profile.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const { user: profileUser, problems = [] } = profile;
  const pendingCount = problems.filter(
    (p) => p.status !== "Resolved" && p.status !== "Process"
  ).length;
  const solvedCount = problems.filter((p) => p.status === "Resolved").length;
  const processCount = problems.filter((p) => p.status === "Process").length;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl text-[#0C2218]">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            profileUser.name
          )}&background=0C2218&color=fff&size=128`}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-1">{profileUser.name}</h2>
          <p className="text-gray-600">Active JanSeva Portal</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow
          icon={<FaEnvelope />}
          label="Email"
          value={profileUser.email}
        />
        <InfoRow
          icon={<FaPhone />}
          label="Phone"
          value={profileUser.phone || "N/A"}
        />
        <InfoRow
          icon={<FaMapMarkerAlt />}
          label="Location"
          value={profileUser.location || "Not specified"}
        />
        <InfoRow
          icon={<FaCalendarAlt />}
          label="Joined"
          value={new Date(profileUser.createdAt).toLocaleDateString()}
        />
      </div>

      {/* Activity Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard
          title="Issues Raised"
          count={pendingCount}
          icon={<FaTasks />}
          color="bg-yellow-100"
        />
        <StatCard
          title="Issues Under Process"
          count={processCount}
          icon={<FaTasks />}
          color="bg-blue-100"
        />
        <StatCard
          title="Issues Solved"
          count={solvedCount}
          icon={<FaCheckCircle />}
          color="bg-green-100"
        />
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
    <div
      className={`p-5 rounded-xl shadow-md ${color} flex items-center gap-4`}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
}
