import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

const CommunityDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1">
        <TopNavbar />
        <div className="p-8">
          <Outlet /> {/* Dynamic Pages Render Here */}
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
