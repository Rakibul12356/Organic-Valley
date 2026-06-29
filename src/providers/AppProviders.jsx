import { AuthProvider } from '@context';

const AppProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
