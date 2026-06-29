import { useState } from 'react';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'reviews', label: 'reviews' },
  { id: 'farmer', label: 'Farmer Info' },
];

const ProductTabs = ({ product, onTabChange }) => {
  const [activeTab, setActiveTab] = useState('description');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.id === 'reviews' ? `Reviews (${product.reviewCount})` : tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-8">
        {activeTab === 'description' && (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>About This Product</h3>
            <p>{product.description.intro}</p>
            <h4>Key Features:</h4>
            <ul>
              {product.description.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <h4>Storage Instructions:</h4>
            <p>{product.description.storage}</p>
            <h4>Nutritional Information (per 100g):</h4>
            <ul>
              {product.description.nutrition.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'farmer' && (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>About the Farmer</h3>
            <p>{product.farmerInfo}</p>
            <p>
              <strong>{product.farmerContact.name}</strong> has been farming since{' '}
              {product.farmerContact.since} and supplies fresh produce through {product.farmer}.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <p className="text-gray-600 dark:text-gray-400">
            Scroll down to read customer reviews for this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
