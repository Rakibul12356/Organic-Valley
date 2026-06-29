import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';

const FarmerCard = ({ farmer }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img src={farmer.image} alt={farmer.name} className="w-full h-64 object-cover" />
        {farmer.isCertified && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              <i className="fas fa-certificate mr-1" aria-hidden="true" />
              Certified
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{farmer.name}</h3>
          <div className="flex items-center text-yellow-400">
            <i className="fas fa-star" aria-hidden="true" />
            <span className="text-gray-600 dark:text-gray-400 ml-1">{farmer.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-3">
          <i className="fas fa-map-marker-alt mr-2" aria-hidden="true" />
          {farmer.location}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4">{farmer.bio}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Farm Size:</span> {farmer.farmSize}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Products:</span> {farmer.productCount}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {farmer.tags.map((tag) => (
            <span key={tag.label} className={`${tag.className} px-2 py-1 rounded-full text-xs`}>
              {tag.label}
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          <Link
            to={ROUTES.PRODUCTS}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition text-center"
          >
            View Products
          </Link>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            aria-label={`Call ${farmer.name}`}
          >
            <i className="fas fa-phone" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default FarmerCard;
