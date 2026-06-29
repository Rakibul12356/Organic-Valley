import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@constants';
import { useAuth } from '@hooks/useAuth';

const FarmerRoute = () => {
  const { isAuthenticated, isFarmer, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (!isFarmer) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default FarmerRoute;
