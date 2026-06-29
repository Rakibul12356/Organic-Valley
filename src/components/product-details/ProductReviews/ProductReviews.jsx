const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400 text-sm">
    {[1, 2, 3, 4, 5].map((star) => (
      <i
        key={star}
        className={star <= rating ? 'fas fa-star' : 'far fa-star'}
        aria-hidden="true"
      />
    ))}
  </div>
);

const ProductReviews = ({ product }) => {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
        <button
          type="button"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Write a Review
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {product.rating}
              </span>
              <div>
                <StarRating rating={Math.round(product.rating)} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on {product.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {product.ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center space-x-2">
                <span className="text-sm w-8">{item.stars}★</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {product.reviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {review.author}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="More options"
                  >
                    <i className="fas fa-ellipsis-v" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{review.text}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <button type="button" className="hover:text-primary-600 dark:hover:text-primary-400">
                    <i className="far fa-thumbs-up mr-1" aria-hidden="true" />
                    Helpful ({review.helpful})
                  </button>
                  <button type="button" className="hover:text-primary-600 dark:hover:text-primary-400">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          type="button"
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
