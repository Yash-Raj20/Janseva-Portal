import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     if (config.data && config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     } else {
//       // Nahi to default json set karo
//       config.headers['Content-Type'] = 'application/json';
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


export default instance;
