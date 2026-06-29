import { useAuth } from '@hooks/useAuth';

/** TanStack Query mutation — POST /auth/login */
export const useLoginMutation = () => {
  const { loginMutation } = useAuth();
  return loginMutation;
};
