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
  },
  {
    id: 'user-farmer-1',
    name: 'Rahim Ahmed',
    email: 'farmer@organicvalley.com',
    password: 'password123',
    role: USER_ROLES.FARMER,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    farmName: "Rahim's Farm",
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
];
