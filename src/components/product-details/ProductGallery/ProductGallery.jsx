import { useState } from 'react';

const ProductGallery = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[selectedIndex]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 ${
                selectedIndex === index
                  ? 'border-primary-500'
                  : 'border-transparent hover:border-primary-500'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
