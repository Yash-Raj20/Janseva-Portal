import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // If not logged in, redirect to login page
    return <Navigate to="/adminlogin" replace />;
  }

  // If logged in, allow access
  return children;
};

export default ProtectedRoute;
