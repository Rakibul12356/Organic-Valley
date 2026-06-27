import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/layout';

const DashboardLayout = () => {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
