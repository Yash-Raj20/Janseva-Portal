import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!profile) return <div className="p-6 text-center text-red-600">Failed to load profile.</div>;

  // Use optional chaining with default empty arrays to avoid undefined errors
  const problems = profile.problems ?? [];
  const notifications = profile.notifications ?? [];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-2">{profile.user?.name || "No Name"}</h2>
        <p className="text-gray-600">{profile.user?.email || "No Email"}</p>
        <p className="text-gray-400 text-sm">
          Joined on {profile.user?.createdAt ? new Date(profile.user.createdAt).toLocaleDateString() : "Unknown"}
        </p>
      </div>

      {/* My Problems */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">🚀 My Raised Problems</h3>
        <div className="space-y-4">
          {problems.length > 0 ? problems.map(problem => (
            <div key={problem._id} className="bg-blue-50 p-4 rounded-lg shadow">
              <h4 className="text-xl font-semibold">{problem.title}</h4>
              <p className="text-gray-700">{problem.description}</p>
              <p className="text-sm text-gray-500">
                Status: <span className="font-bold">{problem.status}</span>
              </p>
            </div>
          )) : <p>No problem raised yet.</p>}
        </div>
      </div>

      {/* My Notifications */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-green-700">🔔 My Notifications</h3>
        <div className="space-y-4">
          {notifications.length > 0 ? notifications.map(notif => (
            <div key={notif._id} className={`p-3 rounded-lg ${notif.isRead ? 'bg-gray-100' : 'bg-green-100'}`}>
              <p>{notif.message}</p>
              <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
            </div>
          )) : <p>No notifications yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;