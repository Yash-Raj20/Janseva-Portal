import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/User/AuthContext";
import { useAdminAuth } from "./context/Admin/AuthContext";
import AdminRoutes from './routes/Admin/AdminRoutes';
import UserRoutes from './routes/User/UserRoutes';
import CustomLoader from "./components/User/CustomLoader";

function App() {
  const { loading: userLoading } = useAuth();
  const { loading: adminLoading } = useAdminAuth();

  if (userLoading || adminLoading) {
    return <div className="flex items-center justify-center h-screen"><CustomLoader /></div>;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} autoClose={3000} />
      <AdminRoutes />
      <UserRoutes />
    </>
  );
}

export default App;