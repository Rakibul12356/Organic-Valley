import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@context';
import { queryClient } from '@lib/queryClient';

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
