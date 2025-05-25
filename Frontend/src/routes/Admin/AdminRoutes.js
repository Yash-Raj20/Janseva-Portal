// src/routes/AdminRoutes.js
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Admin/UserPage/Login";
import Register from "../../pages/Admin/UserPage/Register";
import Dashboard from "../../pages/Admin/AdminPage/Dashboard";
import ProtectedRoute from "../../components/Admin/ProtectedRoute";
import AdminLayout from "../../layout/Admin/AdminLayout";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin-login" element={<Login />} />
    <Route path="/admin-register" element={<Register />} />
    <Route
      path="/admin-dashboard"
      element={
        <ProtectedRoute role="admin">
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AdminRoutes;