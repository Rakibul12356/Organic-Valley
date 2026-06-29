const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const pageButtonClass = (page) => {
    const base =
      'px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white';

    if (page === currentPage) {
      return `${base} text-white bg-primary-600 border-primary-600 hover:bg-primary-700 hover:text-white`;
    }

    return `${base} text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400`;
  };

  return (
    <div className="flex justify-center mt-12">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center -space-x-px text-gray-600 dark:text-gray-300">
          <li>
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Previous page"
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>
          </li>
          {pages.map((page) => (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                className={pageButtonClass(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Next page"
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductPagination;
