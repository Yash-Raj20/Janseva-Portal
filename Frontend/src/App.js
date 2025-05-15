import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/WebPages/Home';
import AboutUs from './pages/WebPages/AboutUs';
import ContactUs from './pages/WebPages/ContactUs';
import NotFoundPage from './NotFoundPage ';
import Login from './pages/AuthPage/Login';
import Register from './pages/AuthPage/Register';
import SubmitProblem from './pages/ProblemPage/SubmitProblem';
import Dashboard from './pages/UserPage/Dashboard';
import AllProblems from './pages/ProblemPage/AllProblems';
import AllCommunity from './pages/CommunityPage/AllCommunity';
import Notifications from './pages/NotificationPage/NotificationsPage';
// import VolunteerDashboard from "./pages/VolunteerDashboard";
import { AuthProvider } from './context/AuthContext';
import SocketNotification from "./components/NotificationSection/SocketNotification";
import { Toaster } from 'react-hot-toast';

function App() {
  const userId = localStorage.getItem('userId');

  return (
    <Router>
      <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit" element={<SubmitProblem />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-problems" element={<AllProblems />} />
          <Route path="/all-community" element={<AllCommunity />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* <Route path="/volunteer" element={<VolunteerDashboard />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        {userId && <SocketNotification userId={userId} />}
      </AuthProvider>
    </Router>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import CommunityDashboard from './pages/CommunityDashboard';
// import CommunityTasks from './pages/CommunityTasks';
// import SubmitProof from './pages/SubmitProof';
// import MyTasks from './pages/MyTasks';
// import Profile from './pages/Profile';
// import ProtectedRoute from './components/ProtectedRoute';
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/dashboard" element={
//           <ProtectedRoute>
//             <CommunityDashboard />
//           </ProtectedRoute>
//         }>
//           <Route index element={<CommunityTasks />} />
//           <Route path="tasks" element={<CommunityTasks />} />
//           <Route path="submit-proof" element={<SubmitProof />} />
//           <Route path="my-tasks" element={<MyTasks />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//         {/* Other public routes here like Home, Login */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

