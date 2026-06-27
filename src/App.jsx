import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@providers';
import ErrorBoundary from '@components/ErrorBoundary';
import { router } from '@routes';
import '@styles/index.css';

const App = () => {
  return (
    <AppProviders>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </AppProviders>
  );
};

export default App;
