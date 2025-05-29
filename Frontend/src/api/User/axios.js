import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (config.data && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      // Nahi to default json set karo
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchNotifications = async () => {
  const response = await instance.get("/notifications");
  return response.data;
};

// Mark a notification as read
export const markAsRead = async (id) => {
  await instance.patch(`/notifications/read/${id}`);
};

export default instance;