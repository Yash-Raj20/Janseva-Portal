import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/UserPage/Login";
import Register from "./pages/UserPage/Register";
import Dashboard from "./pages/AdminPage/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/AdminLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/adminregister" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import AdminSidebar from "./components/AdminSidebar";
// import AdminHeader from "./components/AdminHeader";
// import AdminDashboard from "./pages/AdminDashboard";
// import AssignedProblems from "./pages/AssignedProblems";
// import ResolvedProblems from "./pages/ResolvedProblems";
// import VolunteerManagement from "./pages/VolunteerManagement";
// import AdminLogin from "./pages/AdminLogin";

// function App() {
//   return (
//     <div className="flex min-h-screen">
//       <AdminSidebar />
//       <div className="flex-1 flex flex-col">
//         <AdminHeader />
//         <main className="p-6">
//           <Routes>
//             <Route path="/" element={<AdminDashboard />} />
//             <Route path="/assigned" element={<AssignedProblems />} />
//             <Route path="/resolved" element={<ResolvedProblems />} />
//             <Route path="/volunteers" element={<VolunteerManagement />} />
//             <Route path="/login" element={<AdminLogin />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

