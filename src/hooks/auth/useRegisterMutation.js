import { useAuth } from '@hooks/useAuth';

/** TanStack Query mutation — POST /auth/register */
export const useRegisterMutation = () => {
  const { registerMutation } = useAuth();
  return registerMutation;
};
