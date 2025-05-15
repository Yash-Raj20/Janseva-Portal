import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

export const fetchNotifications = async () => {
  const response = await instance.get('/notifications');
  return response.data;
};

// Mark a notification as read
export const markAsRead = async (id) => {
  await instance.patch(`/notifications/read/${id}`);
};

export default instance;
