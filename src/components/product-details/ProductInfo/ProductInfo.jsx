import { useState } from 'react';

const StarRating = ({ rating, size = 'text-sm' }) => {
  return (
    <div className={`flex text-yellow-400 ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={star <= Math.round(rating) ? 'fas fa-star' : 'far fa-star'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);

  const handleDecrease = () => setQuantity((value) => Math.max(1, value - 1));
  const handleIncrease = () => setQuantity((value) => Math.min(product.stockAmount, value + 1));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                tag === 'Organic'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Produced by{' '}
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            {product.farmer}
          </span>
        </p>
      </div>

      <div className="flex items-center space-x-4 flex-wrap gap-y-2">
        <div className="flex items-center space-x-1">
          <StarRating rating={product.rating} size="text-base" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.rating}
          </span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">({product.reviewCount} reviews)</span>
        <button type="button" className="text-primary-600 dark:text-primary-400 hover:underline">
          Write a review
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              ৳{product.price}
            </span>
            <span className="text-lg text-gray-500 dark:text-gray-400">{product.unit}</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Available Stock</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.stockAmount} kg
            </p>
          </div>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <i className="fas fa-map-marker-alt mr-2" aria-hidden="true" />
          <span>
            {product.location}, Bangladesh
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="product-quantity"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Quantity (kg)
        </label>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleDecrease}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Decrease quantity"
          >
            <i className="fas fa-minus text-sm" aria-hidden="true" />
          </button>
          <input
            id="product-quantity"
            type="number"
            value={quantity}
            min={1}
            max={product.stockAmount}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (!Number.isNaN(value)) {
                setQuantity(Math.min(product.stockAmount, Math.max(1, value)));
              }
            }}
            className="w-20 text-center py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={handleIncrease}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Increase quantity"
          >
            <i className="fas fa-plus text-sm" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <i className="fas fa-bolt mr-2" aria-hidden="true" />
          Buy Now
        </button>
        <button
          type="button"
          className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-medium transition"
        >
          <i className="fas fa-shopping-cart mr-2" aria-hidden="true" />
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => setIsWishlisted((value) => !value)}
          className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-medium transition"
        >
          <i className={`${isWishlisted ? 'fas fa-heart text-red-500' : 'far fa-heart'} mr-2`} aria-hidden="true" />
          Add to Favorite
        </button>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <img
            src={product.farmerContact.avatar}
            alt={product.farmerContact.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {product.farmerContact.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Farmer since {product.farmerContact.since}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
