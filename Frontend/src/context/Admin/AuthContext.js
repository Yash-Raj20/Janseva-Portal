import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/Admin/axios";

const AuthContext = createContext();

export const useAdminAuth = () => useContext(AuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("/admin/profile", {
          withCredentials: true,
        });
        if (res.data.admin) {
          setAdmin(res.data.admin);
        } else {
          setAdmin(null);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setAdmin(null);
        } else {
          console.error("Error fetching admin profile:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      await axios.post("/admin/adminlogin", credentials, {
        withCredentials: true,
      });

      const res = await axios.get("/admin/profile", { withCredentials: true });
      if (res.data.admin) {
        setAdmin(res.data.admin);
        return true;
      } else {
        setAdmin(null);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setAdmin(null);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/admin/logout", {}, { withCredentials: true });
      setAdmin(null);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, setAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
