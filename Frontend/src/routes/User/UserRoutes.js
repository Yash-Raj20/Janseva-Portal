// App.js
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import Home from "../../pages/User/WebPages/Home";
import AboutUs from "../../pages/User/WebPages/AboutUs";
import ContactUs from "../../pages/User/WebPages/ContactUs";
import NotFoundPage from "../../NotFoundPage ";
import Login from "../../pages/User/AuthPage/Login";
import Register from "../../pages/User/AuthPage/Register";
import SubmitProblem from "../../pages/User/ProblemPage/SubmitProblem";
import AllProblems from "../../pages/User/ProblemPage/AllProblems";
import AllCommunity from "../../pages/User/CommunityPage/AllCommunity";
import Dashboard from "../../pages/User/UserDashboardPage/Dashboard";
import Profile from "../../pages/User/UserDashboardPage/Profile";
import MyIssue from "../../pages/User/UserDashboardPage/MyIssue";
import SolvedIssue from "../../pages/User/UserDashboardPage/SolvedIssue";
import Notifications from "../../pages/User/UserDashboardPage/Notifications";
import Layout from "../../layout/User/Layout";
import SocketNotification from "../../components/User/NotificationSection/SocketNotification";
import ProtectedRoute from "../../components/User/ProtectedRoute";

const UserRoutes = () => {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<SubmitProblem />} />
        <Route path="/all-problems" element={<AllProblems />} />
        <Route path="/all-community" element={<AllCommunity />} />

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-issues" element={<MyIssue />} />
            <Route path="solved-issues" element={<SolvedIssue />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />

      {userId && <SocketNotification userId={userId} />}
    </>
  );
};

export default UserRoutes;
