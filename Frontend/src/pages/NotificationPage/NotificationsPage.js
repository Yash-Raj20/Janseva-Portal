// src/pages/NotificationsPage.js
import { useState, useEffect } from 'react';
import Notifications from '../../components/NotificationSection/Notification';

const NotificationsPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Assuming userId is stored in localStorage after login
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <div className="notifications-page">
      <h1 className="text-3xl text-center my-6">Your Notifications</h1>

      {/* Check if user is logged in */}
      {!userId ? (
        <Notifications userId={userId} />
      ) : (
        <div className="text-center text-red-500">Please log in to see notifications.</div>
      )}
    </div>
  );
};

export default NotificationsPage;