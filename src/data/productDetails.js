const DEFAULT_RATING_BREAKDOWN = [
  { stars: 5, count: 75, percent: 75 },
  { stars: 4, count: 20, percent: 20 },
  { stars: 3, count: 3, percent: 3 },
  { stars: 2, count: 1, percent: 1 },
  { stars: 1, count: 1, percent: 1 },
];

export const PRODUCT_DETAILS_EXTRA = {
  tomatoes: {
    tags: ['Organic', 'Fresh'],
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1000&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1000&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1000&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=1000&h=1000&fit=crop',
    ],
    reviewCount: 127,
    stockAmount: 50,
    farmerContact: {
      name: 'Rahim Ahmed',
      since: 2015,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    },
    description: {
      intro:
        'Our fresh, organic tomatoes are grown with care in the fertile soils of Sylhet. These vine-ripened tomatoes are picked at peak freshness and delivered within 24 hours of harvest to ensure maximum flavor and nutritional value.',
      features: [
        '100% Organic - No pesticides or chemical fertilizers',
        'Vine-ripened for optimal taste and nutrition',
        'Harvested within 24 hours of delivery',
        'Rich in vitamins C, K, and antioxidants',
        'Perfect for salads, cooking, and sauces',
      ],
      storage:
        'Store at room temperature for best flavor. Refrigerate only when fully ripe to extend shelf life. Use within 5-7 days for optimal freshness.',
      nutrition: [
        'Calories: 18',
        'Vitamin C: 14mg',
        'Potassium: 237mg',
        'Folate: 15mcg',
      ],
    },
    farmerInfo:
      "Rahim Ahmed has been farming organically in Sylhet since 2015. His farm specializes in vine-ripened tomatoes grown without pesticides, using sustainable irrigation and soil enrichment practices.",
    ratingBreakdown: [
      { stars: 5, count: 95, percent: 75 },
      { stars: 4, count: 25, percent: 20 },
      { stars: 3, count: 5, percent: 4 },
      { stars: 2, count: 1, percent: 1 },
      { stars: 1, count: 1, percent: 1 },
    ],
    reviews: [
      {
        id: 'review-1',
        author: 'Sarah Johnson',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        date: '2 days ago',
        text: "Absolutely amazing tomatoes! The taste is incredible - so fresh and flavorful. You can really tell the difference when they're picked ripe and delivered quickly. Will definitely order again!",
        helpful: 12,
      },
      {
        id: 'review-2',
        author: 'Mike Chen',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        rating: 4,
        date: '1 week ago',
        text: 'Great quality tomatoes, very fresh and organic as advertised. Delivery was on time. Only minor issue was that a couple of tomatoes were slightly overripe, but overall very satisfied.',
        helpful: 8,
      },
      {
        id: 'review-3',
        author: 'Lisa Rahman',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        date: '2 weeks ago',
        text: "Perfect for making fresh salsa! The tomatoes were juicy, flavorful, and had the perfect texture. Rahim's farm consistently delivers high-quality produce. Highly recommend!",
        helpful: 15,
      },
    ],
  },
};

const parseStockAmount = (stock) => {
  const match = String(stock).match(/\d+/);
  return match ? Number(match[0]) : 50;
};

const farmerDisplayName = (farmer) => {
  return farmer
    .replace(/'s Farm$/i, ' Ahmed')
    .replace(/'s Garden$/i, ' Khan')
    .replace(/'s Organics$/i, ' Rahman')
    .replace(/ Farm$/i, '');
};

export const buildDefaultProductDetails = (product) => ({
  tags: product.isOrganic ? ['Organic', 'Fresh'] : ['Fresh'],
  images: [product.image.replace('w=400', 'w=600').replace('h=300', 'h=600'), product.image],
  reviewCount: Math.round(product.rating * 26),
  stockAmount: parseStockAmount(product.stock),
  farmerContact: {
    name: farmerDisplayName(product.farmer),
    since: 2016,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
  },
  description: {
    intro: `Our ${product.name.toLowerCase()} are sourced directly from ${product.farmer} in ${product.location}. Each batch is harvested at peak freshness to deliver the best taste and nutrition to your table.`,
    features: [
      product.isOrganic ? '100% Organic certified produce' : 'Freshly harvested local produce',
      'Delivered within 24 hours of harvest',
      'No middlemen — fair prices for farmers',
      'Rich in essential vitamins and minerals',
      'Ideal for everyday cooking and healthy meals',
    ],
    storage:
      'Store in a cool, dry place. Refrigerate after opening or when fully ripe. Use within 5-7 days for optimal freshness.',
    nutrition: ['Locally sourced', 'No artificial preservatives', 'Packed with natural nutrients'],
  },
  farmerInfo: `${product.farmer} is a trusted local producer in ${product.location}, committed to sustainable farming and delivering fresh produce to communities across Bangladesh.`,
  ratingBreakdown: DEFAULT_RATING_BREAKDOWN,
  reviews: [
    {
      id: 'default-review-1',
      author: 'Ayesha Begum',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      date: '3 days ago',
      text: `Excellent quality! The ${product.name.toLowerCase()} were fresh, flavorful, and arrived on time. Will order again from ${product.farmer}.`,
      helpful: 10,
    },
    {
      id: 'default-review-2',
      author: 'Karim Hossain',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      rating: 4,
      date: '1 week ago',
      text: 'Very satisfied with the purchase. Good value for money and clearly fresh from the farm.',
      helpful: 6,
    },
  ],
});
