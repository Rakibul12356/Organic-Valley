import axios from 'axios';
import { appConfig } from '@config/env';
import { STORAGE_KEYS } from '@constants/storage';

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor — প্রতিটি API কলে JWT স্বয়ংক্রিয়ভাবে পাঠায়
 * localStorage থেকে ov_auth_token নিয়ে Authorization: Bearer <token> হেডার বসায়
 * এটাই re-authentication এর ভিত্তি: token থাকলে backend authenticate middleware যাচাই করে
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
