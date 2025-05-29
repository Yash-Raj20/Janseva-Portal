import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/Admin/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { admin } = useAdminAuth();


  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  if (admin.role !== allowedRoles) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
