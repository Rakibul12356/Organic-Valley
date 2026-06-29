import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { authApi } from '@api';
import { STORAGE_KEYS, USER_ROLES } from '@constants/storage';

export const AuthContext = createContext(null);

const readStoredUser = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const persistAuth = (token, user) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
};

const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN));
  const [isLoading, setIsLoading] = useState(Boolean(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)));
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await authApi.getMe();
        setUser(data.user);
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(data.user));
      } catch {
        clearAuth();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [token]);

  const login = useCallback(async ({ email, password, role }) => {
    setError(null);
    setIsLoading(true);

    try {
      const { data } = await authApi.login({ email, password, role });
      persistAuth(data.token, data.user);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore mock logout errors
    } finally {
      clearAuth();
      setUser(null);
      setToken(null);
      setError(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      error,
      isLoading,
      isAuthenticated: Boolean(user && token),
      isCustomer: user?.role === USER_ROLES.CUSTOMER,
      isFarmer: user?.role === USER_ROLES.FARMER,
      login,
      logout,
      clearError: () => setError(null),
    }),
    [user, token, error, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
