import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';

/**
 * Auth state ও methods ব্যবহারের hook
 * যেকোনো কম্পোনেন্টে: const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
