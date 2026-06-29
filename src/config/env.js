const env = import.meta.env;

export const appConfig = {
  name: env.VITE_APP_NAME || 'Organic Valley',
  version: env.VITE_APP_VERSION || '1.0.0',
  imageBaseUrl: env.VITE_IMAGE_BASE_URL || '',
  apiBaseUrl: env.VITE_API_BASE_URL || '/api',
  isDevelopment: env.DEV,
  isProduction: env.PROD,
};

export default appConfig;
