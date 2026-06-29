import api from './axios';

/**
 * Authentication API wrapper
 * সব মেথড axios দিয়ে backend /api/auth/* এ hit করে
 */
export const authApi = {
  /** লগইন — JWT token + user পাওয়া যায় */
  login: (credentials) => api.post('/auth/login', credentials),

  /** রেজিস্টার — customer/farmer; সফল হলে সাথে সাথে JWT */
  register: (payload) => api.post('/auth/register', payload),

  /** লগআউট — protected; token সহ কল করতে হয় */
  logout: () => api.post('/auth/logout'),

  /**
   * Re-authentication / session verify
   * অ্যাপ লোড বা পেজ রিফ্রেশে AuthContext এটা কল করে
   * টোকেন ঠিক থাকলে বর্তমান user ফেরত দেয়
   */
  getMe: () => api.get('/auth/me'),

  /** প্রোফাইল আপডেট — protected */
  updateProfile: (payload) => api.patch('/auth/profile', payload),
};
