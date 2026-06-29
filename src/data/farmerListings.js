export const LISTING_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out-of-stock',
  LOW_STOCK: 'low-stock',
};

export const LISTING_STATUS_LABELS = {
  [LISTING_STATUSES.ACTIVE]: 'Active',
  [LISTING_STATUSES.INACTIVE]: 'Inactive',
  [LISTING_STATUSES.OUT_OF_STOCK]: 'Out of Stock',
  [LISTING_STATUSES.LOW_STOCK]: 'Low Stock',
};

export const LISTING_STATUS_STYLES = {
  [LISTING_STATUSES.ACTIVE]: 'bg-green-500 text-white',
  [LISTING_STATUSES.INACTIVE]: 'bg-gray-500 text-white',
  [LISTING_STATUSES.OUT_OF_STOCK]: 'bg-red-500 text-white',
  [LISTING_STATUSES.LOW_STOCK]: 'bg-yellow-500 text-white',
};

export const LISTING_CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'grains', label: 'Grains' },
  { value: 'dairy', label: 'Dairy' },
];

export const LISTING_STATUS_FILTERS = [
  { value: '', label: 'All Status' },
  { value: LISTING_STATUSES.ACTIVE, label: 'Active' },
  { value: LISTING_STATUSES.INACTIVE, label: 'Inactive' },
  { value: LISTING_STATUSES.OUT_OF_STOCK, label: 'Out of Stock' },
];

export const FARMER_LISTINGS = [
  {
    id: 'tomatoes',
    name: 'Fresh Tomatoes',
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=200&fit=crop',
    category: 'vegetables',
    isOrganic: true,
    price: 45,
    unit: '/kg',
    stock: '50kg',
    stockAmount: 50,
    rating: 4.8,
    reviewCount: 23,
    status: LISTING_STATUSES.ACTIVE,
    isWishlisted: true,
    slug: 'tomatoes',
  },
  {
    id: 'carrots',
    name: 'Fresh Carrots',
    image:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=200&fit=crop',
    category: 'vegetables',
    isOrganic: true,
    price: 35,
    unit: '/kg',
    stock: '30kg',
    stockAmount: 30,
    rating: 4.9,
    reviewCount: 18,
    status: LISTING_STATUSES.ACTIVE,
    isWishlisted: false,
    slug: 'carrots',
  },
  {
    id: 'spinach',
    name: 'Fresh Spinach',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=200&fit=crop',
    category: 'vegetables',
    isOrganic: true,
    price: 25,
    unit: '/kg',
    stock: '0kg',
    stockAmount: 0,
    rating: 4.7,
    reviewCount: 12,
    status: LISTING_STATUSES.OUT_OF_STOCK,
    isWishlisted: false,
    slug: 'spinach',
  },
  {
    id: 'broccoli',
    name: 'Fresh Broccoli',
    image:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=200&fit=crop',
    category: 'vegetables',
    isOrganic: true,
    price: 55,
    unit: '/kg',
    stock: '5kg',
    stockAmount: 5,
    rating: 4.6,
    reviewCount: 8,
    status: LISTING_STATUSES.LOW_STOCK,
    isWishlisted: false,
    slug: 'broccoli',
  },
  {
    id: 'lettuce',
    name: 'Fresh Lettuce',
    image:
      'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=200&fit=crop',
    category: 'vegetables',
    isOrganic: true,
    price: 30,
    unit: '/kg',
    stock: '25kg',
    stockAmount: 25,
    rating: 4.5,
    reviewCount: 15,
    status: LISTING_STATUSES.ACTIVE,
    isWishlisted: false,
    slug: 'lettuce',
  },
  {
    id: 'cucumber',
    name: 'Fresh Cucumber',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
    category: 'vegetables',
    isOrganic: true,
    price: 20,
    unit: '/kg',
    stock: '40kg',
    stockAmount: 40,
    rating: 4.4,
    reviewCount: 6,
    status: LISTING_STATUSES.INACTIVE,
    isWishlisted: false,
    slug: 'cucumber',
  },
];

const dynamicListings = [];

export const getFarmerListings = () => [...FARMER_LISTINGS, ...dynamicListings];

export const addFarmerListing = (listing) => {
  dynamicListings.unshift(listing);
};

export const LISTINGS_PER_PAGE = 6;
