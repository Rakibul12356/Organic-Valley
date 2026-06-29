import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@components/common';
import { ProductPagination } from '@components/products';
import { ManageListingCard, ManageListingFilters } from '@components/manage-listings';
import { ROUTES } from '@constants';
import { FARMER_LISTINGS, LISTINGS_PER_PAGE } from '@data/farmerListings';

const INITIAL_FILTERS = {
  search: '',
  category: '',
  status: '',
};

const INITIAL_APPLIED_FILTERS = INITIAL_FILTERS;

const filterListings = (listings, filters) => {
  const search = filters.search.trim().toLowerCase();

  return listings.filter((listing) => {
    const matchesSearch = !search || listing.name.toLowerCase().includes(search);
    const matchesCategory = !filters.category || listing.category === filters.category;
    const matchesStatus = !filters.status || listing.status === filters.status;

    return matchesSearch && matchesCategory && matchesStatus;
  });
};

const ManageListingsPage = () => {
  const [draftFilters, setDraftFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_APPLIED_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredListings = useMemo(
    () => filterListings(FARMER_LISTINGS, appliedFilters),
    [appliedFilters],
  );

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / LISTINGS_PER_PAGE));
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * LISTINGS_PER_PAGE,
    currentPage * LISTINGS_PER_PAGE,
  );

  const handleFilterChange = (updates) => {
    setDraftFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Container className="py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to={ROUTES.HOME} className="text-gray-500 hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>
              <i className="fas fa-chevron-right text-gray-400 text-xs" aria-hidden="true" />
            </li>
            <li className="text-gray-900 dark:text-white">Manage Products</li>
          </ol>
        </nav>
      </Container>

      <Container className="py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your product listings and inventory
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
          >
            <i className="fas fa-plus mr-2" aria-hidden="true" />
            Add New Product
          </button>
        </div>

        <ManageListingFilters
          filters={draftFilters}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
        />

        {paginatedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedListings.map((listing) => (
              <ManageListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 py-12">
            No listings match your filters.
          </p>
        )}

        {filteredListings.length > LISTINGS_PER_PAGE && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </>
  );
};

export default ManageListingsPage;
