import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/User/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/profile", { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err.message);
        if (err.response && err.response.status === 401) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateProfile = async (formData) => {
    try {
      const res = await axios.put("/auth/profile", formData, {
        withCredentials: true,
      });

      if (res.data.user) {
        setUser(res.data.user);
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: "Profile update failed" };
      }
    } catch (error) {
      console.error("Profile update error:", error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Update failed",
      };
    }
  };

  const login = async (credentials) => {
    try {
      await axios.post("/auth/login", credentials, { withCredentials: true });

      const res = await axios.get("/auth/profile", { withCredentials: true });
      if (res.data.user) {
        setUser(res.data.user);
        return { success: true, message: "Login successful" };
      } else {
        setUser(null);
        return { success: false, message: "User not found after login" };
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.error || error.message
      );
      setUser(null);
      return {
        success: false,
        message: error.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
