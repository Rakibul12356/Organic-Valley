import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants';
import { useAuth } from '@hooks/useAuth';

/**
 * Protected Route Guard
 * শুধু লগইন ইউজারকে child route এ ঢুকতে দেয়
 * isLoading চলাকালীন অপেক্ষা (re-authentication শেষ হওয়ার জন্য)
 * লগইন না থাকলে /login এ redirect
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
