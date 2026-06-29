import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout, MainLayout } from '@layouts';
import { AdminRoute, FarmerRoute, ProtectedRoute } from '@components/routing';
import { ROUTES } from '@constants';
import HomePage from '@pages/Home';
import ProductsPage from '@pages/Products';
import FarmersPage from '@pages/Farmers';
import AboutPage from '@pages/About';
import ProductDetailsPage from '@pages/ProductDetails';
import LoginPage from '@pages/Login';
import RegisterPage from '@pages/Register';
import CartPage from '@pages/Cart';
import OrdersPage from '@pages/Orders';
import ProfilePage from '@pages/Profile';
import ManageListingsPage from '@pages/ManageListings';
import AddProductPage from '@pages/ManageListings/AddProduct';
import DashboardPage, {
  AdminProductsPage,
  AdminOrdersPage,
  AdminUsersPage,
} from '@pages/Dashboard';

const layoutRoutes = [
  { index: true, element: <HomePage /> },
  { path: 'products', element: <ProductsPage /> },
  { path: 'products/:productId', element: <ProductDetailsPage /> },
  { path: 'farmers', element: <FarmersPage /> },
  { path: 'about', element: <AboutPage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'register', element: <RegisterPage /> },
  {
    element: <FarmerRoute />,
    children: [
      { path: 'manage-listings', element: <ManageListingsPage /> },
      { path: 'manage-listings/add', element: <AddProductPage /> },
    ],
  },
  { path: 'categories', element: null },
  { path: 'contact', element: null },
  { path: 'cart', element: <CartPage /> },
  { path: 'orders', element: <OrdersPage /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: 'profile', element: <ProfilePage /> }],
  },
];

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: layoutRoutes,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        element: <AdminRoute />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'orders', element: <AdminOrdersPage /> },
          { path: 'users', element: <AdminUsersPage /> },
        ],
      },
    ],
  },
]);

export default router;
