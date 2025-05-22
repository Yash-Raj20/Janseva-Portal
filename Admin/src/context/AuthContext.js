import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse stored user:", e);
      localStorage.removeItem("user");
      return null;
    }
  });

  const isAuthenticated = !!user;

  // Optional: fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const res = await axios.get("/auth/profile", {
            withCredentials: true,
          });
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
        } catch (err) {
          if (err.response && [401, 404].includes(err.response.status)) {
            setUser(null);
          } else {
            console.error("Unexpected error fetching user:", err);
          }
        }
      }
    };

    fetchUser();
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "/admin/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/admin-login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
