import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@layouts';
import { ROUTES } from '@constants';
import HomePage from '@pages/Home';
import ProductsPage from '@pages/Products';
import FarmersPage from '@pages/Farmers';
import AboutPage from '@pages/About';
import ProductDetailsPage from '@pages/ProductDetails';
import LoginPage from '@pages/Login';

const layoutRoutes = [
  { index: true, element: <HomePage /> },
  { path: 'products', element: <ProductsPage /> },
  { path: 'products/:productId', element: <ProductDetailsPage /> },
  { path: 'farmers', element: <FarmersPage /> },
  { path: 'about', element: <AboutPage /> },
  { path: 'login', element: <LoginPage /> },
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
