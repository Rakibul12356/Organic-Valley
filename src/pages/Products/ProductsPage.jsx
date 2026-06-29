import { useMemo, useState } from 'react';
import { Container } from '@components/common';
import {
  PRODUCTS_LIST,
  PRICE_RANGES,
  TOTAL_PRODUCTS_COUNT,
  PRODUCTS_PER_PAGE,
} from '@data/products';
import {
  ProductsPageHeader,
  ProductFilters,
  ProductToolbar,
  ProductPagination,
  ProductCard,
} from '@components/products';

const INITIAL_FILTERS = {
  categories: [],
  priceRange: '',
  location: 'All Locations',
  organicOnly: false,
};

const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.reverse();
    default:
      return sorted;
  }
};

const filterProducts = (products, filters) => {
  const priceRange = PRICE_RANGES.find((range) => range.id === filters.priceRange);

  return products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesLocation =
      filters.location === 'All Locations' || product.location === filters.location;
    const matchesOrganic = !filters.organicOnly || product.isOrganic;
    const matchesPrice =
      !priceRange || (product.price >= priceRange.min && product.price <= priceRange.max);

    return matchesCategory && matchesLocation && matchesOrganic && matchesPrice;
  });
};

const ProductsPage = () => {
  const [draftFilters, setDraftFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(
    () => sortProducts(filterProducts(PRODUCTS_LIST, appliedFilters), sortBy),
    [appliedFilters, sortBy],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const showingFrom = filteredProducts.length === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const showingTo = Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length);

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
      <ProductsPageHeader />

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters
              filters={draftFilters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <ProductToolbar
              showingFrom={showingFrom}
              showingTo={showingTo}
              totalCount={TOTAL_PRODUCTS_COUNT}
              sortBy={sortBy}
              viewMode={viewMode}
              onSortChange={setSortBy}
              onViewModeChange={setViewMode}
            />

            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'flex flex-col gap-6'
              }
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {paginatedProducts.length === 0 && (
              <p className="text-center text-gray-600 dark:text-gray-400 py-12">
                No products match your filters.
              </p>
            )}

            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductsPage;
