import { useAuth } from '@hooks/useAuth';

/** TanStack Query — GET /auth/me (re-authentication / current user) */
export const useCurrentUserQuery = () => {
  const { user, token, isLoading, isAuthenticated } = useAuth();

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
  };
};
