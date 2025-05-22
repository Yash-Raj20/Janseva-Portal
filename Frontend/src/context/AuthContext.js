import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import CustomLoader from "../components/CustomLoader";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLoader(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  // ✅ 2. Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/profile", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 404)) {
          setUser(null);
        } else {
          console.error("Unexpected error fetching user:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const res = await axios.post("/auth/logout", {}, { withCredentials: true });
      if (res.status === 200) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Show loader while either initial or API loading is true
  if (loading || showInitialLoader) {
    return <CustomLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
