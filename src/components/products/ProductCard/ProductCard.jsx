import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductDetailsPath } from '@data/products';

const ProductCard = ({ product, compact = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
  const productSlug = product.slug || product.id;
  const detailsPath = getProductDetailsPath(productSlug);

  const stopPropagation = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <Link to={detailsPath} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {product.isOrganic && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Organic
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={(event) => {
              stopPropagation(event);
              setIsWishlisted((value) => !value);
            }}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <i
              className={`${isWishlisted ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600 dark:text-gray-400'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className={compact ? 'p-4' : 'p-6'}>
        <div className="flex items-center justify-between mb-2">
          <Link
            to={detailsPath}
            className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            {product.name}
          </Link>
          <div className="flex items-center text-yellow-400">
            <i className="fas fa-star text-sm" aria-hidden="true" />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          By {product.farmer}
          {!compact && ` • ${product.location}`}
        </p>
        <div className={`flex items-center justify-between ${compact ? '' : 'mb-4'}`}>
          <div>
            <span
              className={`font-bold text-primary-600 dark:text-primary-400 ${compact ? 'text-lg' : 'text-2xl'}`}
            >
              ৳{product.price}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{product.unit}</span>
          </div>
          {!compact && (
            <span className="text-sm text-gray-500 dark:text-gray-400">Stock: {product.stock}</span>
          )}
        </div>
        {!compact && (
          <button
            type="button"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
