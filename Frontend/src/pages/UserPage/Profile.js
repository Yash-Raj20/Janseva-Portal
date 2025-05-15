import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/users/profile');
      setProfile(res.data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-2">{profile.user.name}</h2>
        <p className="text-gray-600">{profile.user.email}</p>
        <p className="text-gray-400 text-sm">Joined on {new Date(profile.user.createdAt).toLocaleDateString()}</p>
      </div>

      {/* My Issues */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">🚀 My Raised Problems</h3>
        <div className="space-y-4">
          {profile.issues.length > 0 ? profile.issues.map(issue => (
            <div key={issue._id} className="bg-blue-50 p-4 rounded-lg shadow">
              <h4 className="text-xl font-semibold">{issue.title}</h4>
              <p className="text-gray-700">{issue.description}</p>
              <p className="text-sm text-gray-500">Status: <span className="font-bold">{issue.status}</span></p>
            </div>
          )) : <p>No issues raised yet.</p>}
        </div>
      </div>

      {/* My Notifications */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-green-700">🔔 My Notifications</h3>
        <div className="space-y-4">
          {profile.notifications.length > 0 ? profile.notifications.map(notif => (
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
