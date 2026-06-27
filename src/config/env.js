const env = import.meta.env;

export const appConfig = {
  name: env.VITE_APP_NAME || 'Organic Valley',
  version: env.VITE_APP_VERSION || '1.0.0',
  imageBaseUrl: env.VITE_IMAGE_BASE_URL || '',
  isDevelopment: env.DEV,
  isProduction: env.PROD,
};

export default appConfig;
