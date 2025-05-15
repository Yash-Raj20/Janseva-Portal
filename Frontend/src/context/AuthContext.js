/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Sync token on mount
      if (isTokenExpired(storedToken)) {
        logout(); // Automatically log out if the token is expired
      }
    }
  }, []);

  // Check if the token has expired
  const isTokenExpired = (userToken) => {
    try {
      const decodedToken = jwtDecode(userToken);
      return decodedToken.exp * 1000 < Date.now(); // JWT expiration is in seconds, so multiply by 1000
    } catch (err) {
      return true; // If decoding fails, treat it as expired
    }
  };

  const login = (userToken) => {
    console.log('Saving token:', userToken); // Log token to ensure it's correct
    setToken(userToken);
    localStorage.setItem('token', userToken);
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login after logout (optional)
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
