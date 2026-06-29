import { useAuth } from '@hooks/useAuth';

/** TanStack Query mutation — POST /auth/logout */
export const useLogoutMutation = () => {
  const { logoutMutation } = useAuth();
  return logoutMutation;
};
