import { Link } from 'react-router-dom';
import {
  LISTING_STATUS_LABELS,
  LISTING_STATUS_STYLES,
  LISTING_STATUSES,
} from '@data/farmerListings';
import { getProductDetailsPath } from '@data/products';

const getStockClass = (listing) => {
  if (listing.status === LISTING_STATUSES.OUT_OF_STOCK) return 'text-red-500';
  if (listing.status === LISTING_STATUSES.LOW_STOCK) return 'text-yellow-600';
  return 'text-gray-500 dark:text-gray-400';
};

const ManageListingCard = ({ listing }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${LISTING_STATUS_STYLES[listing.status]}`}
          >
            {LISTING_STATUS_LABELS[listing.status]}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            type="button"
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label={listing.isWishlisted ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i
              className={`${listing.isWishlisted ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600 dark:text-gray-400'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">{listing.name}</h3>
          <div className="flex items-center text-yellow-400">
            <i className="fas fa-star text-sm" aria-hidden="true" />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {listing.rating} ({listing.reviewCount})
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {listing.isOrganic ? 'Organic' : 'Conventional'} •{' '}
          {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ৳{listing.price}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{listing.unit}</span>
          </div>
          <span className={`text-sm ${getStockClass(listing)}`}>Stock: {listing.stock}</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition text-sm"
          >
            <i className="fas fa-edit mr-1" aria-hidden="true" />
            Edit
          </button>
          <Link
            to={getProductDetailsPath(listing.slug)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center justify-center"
            aria-label={`View ${listing.name}`}
          >
            <i className="fas fa-eye" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
            aria-label={`Delete ${listing.name}`}
          >
            <i className="fas fa-trash" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ManageListingCard;
