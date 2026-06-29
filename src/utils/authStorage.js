import { STORAGE_KEYS } from '@constants/storage';

export const getAuthToken = () => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

export const readStoredUser = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const persistAuth = (token, user) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
};
