export const DASHBOARD_STATS = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '৳1,24,500',
    change: '+12.5%',
    trend: 'up',
    icon: 'fa-dollar-sign',
    color: 'bg-green-500',
  },
  {
    id: 'orders',
    label: 'Total Orders',
    value: '1,248',
    change: '+8.2%',
    trend: 'up',
    icon: 'fa-shopping-bag',
    color: 'bg-blue-500',
  },
  {
    id: 'products',
    label: 'Active Products',
    value: '342',
    change: '+3.1%',
    trend: 'up',
    icon: 'fa-box',
    color: 'bg-primary-500',
  },
  {
    id: 'users',
    label: 'Registered Users',
    value: '856',
    change: '+15.4%',
    trend: 'up',
    icon: 'fa-users',
    color: 'bg-purple-500',
  },
];

export const RECENT_ORDERS = [
  {
    id: 'OV-2024-0891',
    customer: 'John Doe',
    product: 'Fresh Tomatoes',
    amount: 450,
    status: 'Delivered',
    date: 'Jun 28, 2026',
  },
  {
    id: 'OV-2024-0890',
    customer: 'Sarah Khan',
    product: 'Organic Honey',
    amount: 890,
    status: 'Pending',
    date: 'Jun 28, 2026',
  },
  {
    id: 'OV-2024-0889',
    customer: 'Karim Hassan',
    product: 'Fresh Broccoli',
    amount: 220,
    status: 'Confirmed',
    date: 'Jun 27, 2026',
  },
  {
    id: 'OV-2024-0888',
    customer: 'Ayesha Rahman',
    product: 'Organic Rice',
    amount: 1200,
    status: 'Delivered',
    date: 'Jun 27, 2026',
  },
  {
    id: 'OV-2024-0887',
    customer: 'Imran Ali',
    product: 'Fresh Lettuce',
    amount: 180,
    status: 'Cancelled',
    date: 'Jun 26, 2026',
  },
];

export const ADMIN_PRODUCTS = [
  { id: 1, name: 'Fresh Tomatoes', category: 'Vegetables', farmer: "Rahim's Farm", price: 45, stock: 120, status: 'Active' },
  { id: 2, name: 'Organic Honey', category: 'Honey', farmer: 'Sundarban Apiary', price: 890, stock: 45, status: 'Active' },
  { id: 3, name: 'Fresh Broccoli', category: 'Vegetables', farmer: "Anika's Garden", price: 55, stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Organic Rice', category: 'Grains', farmer: 'Green Valley Farm', price: 120, stock: 200, status: 'Active' },
  { id: 5, name: 'Fresh Lettuce', category: 'Vegetables', farmer: 'Green Valley Farm', price: 30, stock: 85, status: 'Active' },
];

export const ADMIN_USERS = [
  { id: 1, name: 'John Doe', email: 'customer@organicvalley.com', role: 'Customer', joined: 'Jan 2024', status: 'Active' },
  { id: 2, name: 'Rahim Ahmed', email: 'farmer@organicvalley.com', role: 'Farmer', joined: 'Feb 2024', status: 'Active' },
  { id: 3, name: 'Sarah Khan', email: 'sarah@example.com', role: 'Customer', joined: 'Mar 2024', status: 'Active' },
  { id: 4, name: 'Anika Begum', email: 'anika@example.com', role: 'Farmer', joined: 'Apr 2024', status: 'Active' },
  { id: 5, name: 'Karim Hassan', email: 'karim@example.com', role: 'Customer', joined: 'May 2024', status: 'Inactive' },
];

export const orderStatusClass = (status) => {
  if (status === 'Delivered') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  if (status === 'Confirmed') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
};

export const productStatusClass = (status) => {
  if (status === 'Active') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
};

export const userStatusClass = (status) => {
  if (status === 'Active') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};
