import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants';
import { useAuth } from '@hooks/useAuth';

/** Admin-only route — authenticate + role === admin */
const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
