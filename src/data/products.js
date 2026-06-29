import { PRODUCT_DETAILS_EXTRA, buildDefaultProductDetails } from './productDetails';

export const PRODUCTS_LIST = [
  {
    id: 'tomatoes',
    name: 'Fresh Tomatoes',
    farmer: "Rahim's Farm",
    location: 'Sylhet',
    category: 'vegetables',
    price: 45,
    unit: '/kg',
    stock: '50kg',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
    isOrganic: true,
    isWishlisted: false,
  },
  {
    id: 'carrots',
    name: 'Fresh Carrots',
    farmer: "Shumi's Garden",
    location: 'Rangpur',
    category: 'vegetables',
    price: 35,
    unit: '/kg',
    stock: '30kg',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
    isOrganic: false,
    isWishlisted: false,
  },
  {
    id: 'spinach',
    name: 'Fresh Spinach',
    farmer: "Sakib's Organics",
    location: 'Dhaka',
    category: 'vegetables',
    price: 25,
    unit: '/kg',
    stock: '20kg',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
    isOrganic: true,
    isWishlisted: true,
  },
  {
    id: 'broccoli',
    name: 'Fresh Broccoli',
    farmer: "Anika's Garden",
    location: 'Chittagong',
    category: 'vegetables',
    price: 55,
    unit: '/kg',
    stock: '15kg',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
    isOrganic: false,
    isWishlisted: false,
  },
  {
    id: 'lettuce',
    name: 'Fresh Lettuce',
    farmer: 'Green Valley Farm',
    location: 'Sylhet',
    category: 'vegetables',
    price: 30,
    unit: '/kg',
    stock: '25kg',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=300&fit=crop',
    isOrganic: true,
    isWishlisted: false,
  },
  {
    id: 'cucumber',
    name: 'Fresh Cucumber',
    farmer: 'Fresh Fields',
    location: 'Dhaka',
    category: 'vegetables',
    price: 20,
    unit: '/kg',
    stock: '40kg',
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    isOrganic: false,
    isWishlisted: false,
  },
];

export const FEATURED_PRODUCTS = [
  ...PRODUCTS_LIST,
  PRODUCTS_LIST[1],
  PRODUCTS_LIST[3],
  PRODUCTS_LIST[3],
].map((product, index) => ({
  ...product,
  id: `${product.id}-featured-${index}`,
  slug: product.id,
}));

export const getProductDetailsPath = (slug) => `/products/${slug}`;

export const getProductBySlug = (slug) => PRODUCTS_LIST.find((product) => product.id === slug);

export const getRelatedProducts = (slug, limit = 4) =>
  PRODUCTS_LIST.filter((product) => product.id !== slug).slice(0, limit);

export const getProductDetails = (slug) => {
  const base = getProductBySlug(slug);
  if (!base) return null;

  const extra = PRODUCT_DETAILS_EXTRA[slug] || buildDefaultProductDetails(base);
  return { ...base, slug: base.id, ...extra };
};

export const FILTER_CATEGORIES = [
  { id: 'vegetables', label: 'Vegetables', count: 45 },
  { id: 'fruits', label: 'Fruits', count: 32 },
  { id: 'grains', label: 'Grains', count: 18 },
  { id: 'dairy', label: 'Dairy', count: 12 },
];

export const PRICE_RANGES = [
  { id: 'under-30', label: 'Under ৳30', min: 0, max: 29 },
  { id: '30-50', label: '৳30 - ৳50', min: 30, max: 50 },
  { id: '50-100', label: '৳50 - ৳100', min: 50, max: 100 },
  { id: 'over-100', label: 'Over ৳100', min: 101, max: Infinity },
];

export const LOCATIONS = ['All Locations', 'Dhaka', 'Chittagong', 'Sylhet', 'Rangpur'];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Sort by: Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Rating' },
];

export const TOTAL_PRODUCTS_COUNT = 48;
export const PRODUCTS_PER_PAGE = 6;
