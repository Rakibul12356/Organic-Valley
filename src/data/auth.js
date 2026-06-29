import { USER_ROLES } from '@constants/storage';

export const DUMMY_USERS = [
  {
    id: 'user-customer-1',
    name: 'John Doe',
    email: 'customer@organicvalley.com',
    password: 'password123',
    role: USER_ROLES.CUSTOMER,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    phone: '+880 1712 345678',
    address: '12 Green Street, Dhaka 1205',
    bio: 'Love fresh organic vegetables and supporting local farmers.',
  },
  {
    id: 'user-farmer-1',
    name: 'Rahim Ahmed',
    email: 'farmer@organicvalley.com',
    password: 'password123',
    role: USER_ROLES.FARMER,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    phone: '+880 1812 987654',
    address: 'Village Road, Savar, Dhaka',
    bio: 'Third-generation organic farmer growing seasonal vegetables.',
    farmName: "Rahim's Farm",
    specialization: 'vegetables',
    farmSize: '12',
    farmSizeUnit: 'acres',
  },
  {
    id: 'user-admin-1',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin12345',
    role: USER_ROLES.ADMIN,
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    phone: '+880 1911 000000',
    address: 'Organic Valley HQ, Dhaka',
    bio: 'Platform administrator.',
  },
];

export const LOGIN_ROLE_OPTIONS = [
  {
    value: USER_ROLES.CUSTOMER,
    label: 'Customer',
    description: 'Shop fresh organic products',
    icon: 'fa-shopping-bag',
  },
  {
    value: USER_ROLES.FARMER,
    label: 'Farmer',
    description: 'Sell your farm produce',
    icon: 'fa-tractor',
  },
  {
    value: USER_ROLES.ADMIN,
    label: 'Admin',
    description: 'Manage the platform',
    icon: 'fa-user-shield',
  },
];
