import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/Admin/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin } = useAdminAuth();


  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
