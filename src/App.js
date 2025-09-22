import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/User/AuthContext";
import CustomLoader from "./components/User/CustomLoader";
import ErrorBoundry from "./pages/ErrorBoundary";

// Layouts & Components
const UserWrapper = lazy(() => import("./layout/User/WraperLayout"));
const Layout = lazy(() => import("./layout/User/Layout"));
const ProtectedRoute = lazy(() => import("./components/User/ProtectedRoute"));
const SocketNotification = lazy(() =>
  import("./components/User/NotificationSection/SocketNotification")
);

// Public Pages
const Home = lazy(() => import("./pages/User/WebPages/Home"));
const AboutUs = lazy(() => import("./pages/User/WebPages/AboutUs"));
const ContactUs = lazy(() => import("./pages/User/WebPages/ContactUs"));
const Login = lazy(() => import("./pages/User/AuthPage/Login"));
const Register = lazy(() => import("./pages/User/AuthPage/Register"));
const SubmitProblem = lazy(() => import("./pages/User/ProblemPage/SubmitProblem"));
const AllProblems = lazy(() => import("./pages/User/ProblemPage/AllProblems"));
const ProblemDetails = lazy(() => import("./pages/User/ProblemPage/ProblemDetails"));

// Dashboard Pages
const Dashboard = lazy(() =>
  import("./pages/User/UserDashboardPage/Dashboard")
);
const Profile = lazy(() => import("./pages/User/UserDashboardPage/Profile"));
const MyIssue = lazy(() => import("./pages/User/UserDashboardPage/MyIssue"));
const SolvedIssue = lazy(() =>
  import("./pages/User/UserDashboardPage/SolvedIssue")
);
const Notifications = lazy(() =>
  import("./pages/User/UserDashboardPage/Notifications")
);

// Error Pages
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const { loading } = useAuth();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || appLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CustomLoader />
      </div>
    );
  }

  const userId = localStorage.getItem("userId");

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <ErrorBoundry>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <CustomLoader />
            </div>
          }
        >
          <Routes>
            {/* === PUBLIC ROUTES === */}
            <Route element={<UserWrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/submit" element={<SubmitProblem />} />
              <Route path="/all-problems" element={<AllProblems />} />
              <Route path="/problems/:id" element={<ProblemDetails />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* === PROTECTED ROUTES === */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="my-issues" element={<MyIssue />} />
                  <Route path="solved-issues" element={<SolvedIssue />} />
                  <Route path="notifications" element={<Notifications />} />
                </Route>
              </Route>
            </Route>

            {/* === 404 === */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {userId && <SocketNotification userId={userId} />}
        </Suspense>
      </ErrorBoundry>
    </>
  );
}

export default App;