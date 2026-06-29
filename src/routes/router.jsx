import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@layouts';
import { ROUTES } from '@constants';
import HomePage from '@pages/Home';
import ProductsPage from '@pages/Products';

const layoutRoutes = [
  { index: true, element: <HomePage /> },
  { path: 'products', element: <ProductsPage /> },
  { path: 'categories', element: null },
  { path: 'contact', element: null },
  { path: 'cart', element: null },
  { path: 'profile', element: null },
];

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: layoutRoutes,
  },
]);

export default router;
