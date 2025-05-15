import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export const routes = [
    { path: "/adminlogin", element: <Login /> },
    { path: "/adminregister", element: <Register /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )
    }
  ];
  