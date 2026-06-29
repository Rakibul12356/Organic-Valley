import { createContext, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@api';
import { queryKeys } from '@constants/queryKeys';
import { USER_ROLES } from '@constants/storage';
import {
  clearAuth,
  getAuthToken,
  persistAuth,
  readStoredUser,
} from '@utils/authStorage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(getAuthToken);

  /** Re-authentication: token থাকলে GET /auth/me দিয়ে সেশন যাচাই */
  const currentUserQuery = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const { data } = await authApi.getMe();
      const storedToken = getAuthToken();
      if (storedToken) {
        persistAuth(storedToken, data.user);
      }
      return data.user;
    },
    enabled: Boolean(token),
    retry: false,
    staleTime: 5 * 60 * 1000,
    placeholderData: () => readStoredUser() ?? undefined,
  });

  useEffect(() => {
    if (currentUserQuery.isError) {
      clearAuth();
      setToken(null);
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });
    }
  }, [currentUserQuery.isError, queryClient]);

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await authApi.login(credentials);
      return data;
    },
    onSuccess: (data) => {
      persistAuth(data.token, data.user);
      setToken(data.token);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await authApi.register(payload);
      return data;
    },
    onSuccess: (data) => {
      persistAuth(data.token, data.user);
      setToken(data.token);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearAuth();
      setToken(null);
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await authApi.updateProfile(payload);
      return data.user;
    },
    onSuccess: (user) => {
      const storedToken = getAuthToken();
      if (storedToken) {
        persistAuth(storedToken, user);
      }
      queryClient.setQueryData(queryKeys.auth.me, user);
    },
  });

  const user = currentUserQuery.data ?? null;
  const isInitializing = Boolean(token) && currentUserQuery.isLoading;

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading: isInitializing,
      isAuthenticated: Boolean(user && token),
      isCustomer: user?.role === USER_ROLES.CUSTOMER,
      isFarmer: user?.role === USER_ROLES.FARMER,
      isAdmin: user?.role === USER_ROLES.ADMIN,
      loginMutation,
      registerMutation,
      logoutMutation,
      updateProfileMutation,
      login: (credentials) => loginMutation.mutateAsync(credentials).then((data) => data.user),
      register: (payload) => registerMutation.mutateAsync(payload).then((data) => data.user),
      logout: () => logoutMutation.mutateAsync(),
      updateProfile: (payload) => updateProfileMutation.mutateAsync(payload),
    }),
    [
      user,
      token,
      isInitializing,
      loginMutation,
      registerMutation,
      logoutMutation,
      updateProfileMutation,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
