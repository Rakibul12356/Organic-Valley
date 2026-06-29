import { FILTER_CATEGORIES, LOCATIONS, PRICE_RANGES } from '@data/products';

const ProductFilters = ({ filters, onFilterChange, onApply }) => {
  const handleCategoryChange = (categoryId) => {
    const categories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];

    onFilterChange({ categories });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Category</h4>
        <div className="space-y-2">
          {FILTER_CATEGORIES.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {category.label} ({category.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === range.id}
                onChange={() => onFilterChange({ priceRange: range.id })}
                className="border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Location</h4>
        <select
          value={filters.location}
          onChange={(event) => onFilterChange({ location: event.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.organicOnly}
            onChange={(event) => onFilterChange({ organicOnly: event.target.checked })}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Organic Only</span>
        </label>
      </div>

      <button
        type="button"
        onClick={onApply}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters;
