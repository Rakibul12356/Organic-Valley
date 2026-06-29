import { SORT_OPTIONS } from '@data/products';

const ProductToolbar = ({
  showingFrom,
  showingTo,
  totalCount,
  sortBy,
  viewMode,
  onSortChange,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <p className="text-gray-600 dark:text-gray-400">
        Showing {showingFrom}-{showingTo} of {totalCount} products
      </p>
      <div className="flex items-center space-x-4">
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-l-lg transition ${
              viewMode === 'grid'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="Grid view"
          >
            <i className="fas fa-th" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-r-lg transition ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="List view"
          >
            <i className="fas fa-list" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
