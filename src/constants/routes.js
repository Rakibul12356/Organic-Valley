export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:productId',
  CATEGORIES: '/categories',
  CATEGORY_DETAILS: '/categories/:categoryId',
  FARMERS: '/farmers',
  BRANDS: '/brands',
  BRAND_DETAILS: '/brands/:brandId',
  OFFERS: '/offers',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:orderId',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  SEARCH: '/search',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  NOT_FOUND: '*',
};

export const ADMIN_ROUTES = {
  DASHBOARD: '/dashboard',
  PRODUCTS: '/dashboard/products',
  ORDERS: '/dashboard/orders',
  USERS: '/dashboard/users',
};

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.PRODUCTS,
  ROUTES.PRODUCT_DETAILS,
  ROUTES.CATEGORIES,
  ROUTES.CATEGORY_DETAILS,
  ROUTES.FARMERS,
  ROUTES.BRANDS,
  ROUTES.BRAND_DETAILS,
  ROUTES.OFFERS,
  ROUTES.SEARCH,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

export const PROTECTED_ROUTES = [
  ROUTES.CART,
  ROUTES.WISHLIST,
  ROUTES.CHECKOUT,
  ROUTES.ORDERS,
  ROUTES.ORDER_DETAILS,
  ROUTES.PROFILE,
];

export const ADMIN_ONLY_ROUTES = [ROUTES.DASHBOARD, ...Object.values(ADMIN_ROUTES)];
