export const getAuthErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (!error) return '';
  return error.response?.data?.message || error.message || fallback;
};
