import axios from 'axios';
import { appConfig } from '@config/env';
import { STORAGE_KEYS } from '@constants/storage';
import { resolveMockResponse } from './mockAuth';

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.defaults.adapter = async (config) => {
  const mocked = await resolveMockResponse(config);
  if (mocked) return mocked;

  throw new axios.AxiosError(
    'No API handler configured for this request.',
    'ERR_MOCK_NOT_FOUND',
    config,
  );
};

export default api;
