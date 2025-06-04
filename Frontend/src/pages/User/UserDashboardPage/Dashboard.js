import { useEffect, useState } from "react";
import axios from "../../../api/User/axios";
import { Link } from "react-router-dom";
import { FaUser, FaBell, FaTasks, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function DashboardHome() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/auth/profile", { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
        setError(false);
      })
      .catch((err) => {
        console.error("Profile fetch failed:", err);
        toast.error("Failed to load dashboard. Please try again later.");
        setError(true);
      });
  }, []);

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load dashboard. Please try again later.
      </div>
    );
  }

  const { user: profileUser, problems = [], notifications = [] } = profile;

  const allCount = problems.length;
  const pendingCount = problems.filter((p) => p.status !== "Resolved").length;
  const solvedCount = problems.filter((p) => p.status === "Resolved").length;

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-green-50 to-white text-[#0C2218]">
      <div className="mb-6 md:mb-8 text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Welcome, {profileUser.name} 👋
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm md:text-base">
          Here’s an overview of your JanSeva activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard title="All Issues" count={allCount} icon={<FaTasks size={28} />} color="bg-[#183A2A] text-white" />
        <StatCard title="Pending Issues" count={pendingCount} icon={<FaTasks size={28} />} color="bg-yellow-200" />
        <StatCard title="Solved Issues" count={solvedCount} icon={<FaCheckCircle size={28} />} color="bg-green-200" />
        <StatCard title="Notifications" count={notifications.length} icon={<FaBell size={28} />} color="bg-purple-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <NavCard title="My Profile" link="/dashboard/profile" icon={<FaUser />} />
        <NavCard title="My Issues" link="/dashboard/my-issues" icon={<FaTasks />} />
        <NavCard title="Solved Issues" link="/dashboard/solved-issues" icon={<FaCheckCircle />} />
        <NavCard title="Notifications" link="/dashboard/notifications" icon={<FaBell />} />
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, color }) {
  return (
    <div
      className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-md ${color} flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300`}
    >
      <div className="text-2xl md:text-3xl">{icon}</div>
      <div>
        <h4 className="text-sm sm:text-base md:text-lg font-semibold">{title}</h4>
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}

function NavCard({ title, link, icon }) {
  return (
    <Link to={link} className="block">
      <div className="p-4 sm:p-5 md:p-6 bg-white hover:bg-green-50 border border-green-100 rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02] flex items-center gap-4">
        <div className="text-2xl md:text-3xl text-[#0C2218]">{icon}</div>
        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#0C2218]">
          {title}
        </h4>
      </div>
    </Link>
  );
}