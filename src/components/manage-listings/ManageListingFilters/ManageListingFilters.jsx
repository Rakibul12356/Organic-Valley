import { LISTING_CATEGORIES, LISTING_STATUS_FILTERS } from '@data/farmerListings';

const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white';

const ManageListingFilters = ({ filters, onFilterChange, onApply }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="listing-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              id="listing-search"
              type="text"
              value={filters.search}
              onChange={(event) => onFilterChange({ search: event.target.value })}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        <div>
          <label htmlFor="listing-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            id="listing-category"
            value={filters.category}
            onChange={(event) => onFilterChange({ category: event.target.value })}
            className={INPUT_CLASS}
          >
            {LISTING_CATEGORIES.map((item) => (
              <option key={item.value || 'all'} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="listing-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            id="listing-status"
            value={filters.status}
            onChange={(event) => onFilterChange({ status: event.target.value })}
            className={INPUT_CLASS}
          >
            {LISTING_STATUS_FILTERS.map((item) => (
              <option key={item.value || 'all'} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onApply}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageListingFilters;
