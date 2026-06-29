import api from './axios';

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (payload) => api.post('/auth/register', payload),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};
