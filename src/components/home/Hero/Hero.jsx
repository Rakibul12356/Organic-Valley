import { useState } from 'react';
import { PRODUCT_CATEGORY_LABELS } from '@constants';

const HERO_STATS = [
  { value: '500+', label: 'Local Farmers' },
  { value: '2000+', label: 'Fresh Products' },
  { value: '10k+', label: 'Happy Customers' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  ...Object.entries(PRODUCT_CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20" aria-hidden="true" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Fresh from Farm to Your Table</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Connect directly with local farmers and get the freshest produce delivered to your
            doorstep
          </p>

          <form className="max-w-2xl mx-auto mb-8" onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden shadow-lg">
              <label htmlFor="hero-search" className="sr-only">
                Search for vegetables, fruits, farmers
              </label>
              <input
                id="hero-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for vegetables, fruits, farmers..."
                className="flex-1 px-6 py-4 text-gray-900 text-lg focus:outline-none"
              />
              <label htmlFor="hero-category" className="sr-only">
                Category
              </label>
              <select
                id="hero-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="px-4 py-4 text-gray-900 border-t sm:border-t-0 sm:border-l border-gray-300 focus:outline-none"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-primary-700 hover:bg-primary-800 px-8 py-4 transition"
                aria-label="Search"
              >
                <i className="fas fa-search text-xl" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-green-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
