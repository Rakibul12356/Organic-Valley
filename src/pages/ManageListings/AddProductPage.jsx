import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '@components/common';
import { ROUTES } from '@constants';
import {
  PRODUCT_FORM_CATEGORIES,
  PRODUCT_FORM_UNITS,
  PRODUCT_FEATURES,
  MAX_PRODUCT_IMAGES,
  MAX_IMAGE_SIZE,
  UNIT_DISPLAY,
} from '@data/addProduct';
import { addFarmerListing, LISTING_STATUSES } from '@data/farmerListings';

const INPUT_CLASS =
  'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [stock, setStock] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [features, setFeatures] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeatureToggle = (value) => {
    setFeatures((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);
    setFormError('');

    if (files.length > MAX_PRODUCT_IMAGES) {
      setFormError(`You can upload a maximum of ${MAX_PRODUCT_IMAGES} images.`);
      event.target.value = '';
      return;
    }

    const oversized = files.find((file) => file.size > MAX_IMAGE_SIZE);
    if (oversized) {
      setFormError('Each image must be 10MB or smaller.');
      event.target.value = '';
      return;
    }

    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers).then((previews) => setImagePreviews(previews));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (imagePreviews.length === 0) {
      setFormError('Please upload at least one product image.');
      return;
    }

    setIsSubmitting(true);

    const stockAmount = Number(stock);
    const slug = `${slugify(productName)}-${Date.now()}`;
    const isOrganic = features.includes('organic');

    addFarmerListing({
      id: slug,
      slug,
      name: productName,
      image: imagePreviews[0],
      category,
      isOrganic,
      price: Number(price),
      unit: UNIT_DISPLAY[unit] || `/${unit}`,
      stock: `${stockAmount}kg`,
      stockAmount,
      rating: 0,
      reviewCount: 0,
      status:
        stockAmount === 0
          ? LISTING_STATUSES.OUT_OF_STOCK
          : stockAmount <= 5
            ? LISTING_STATUSES.LOW_STOCK
            : LISTING_STATUSES.ACTIVE,
      isWishlisted: false,
      description,
      farmLocation,
      harvestDate,
      features,
      images: imagePreviews,
    });

    await new Promise((resolve) => setTimeout(resolve, 600));
    navigate(ROUTES.MANAGE_LISTINGS, { replace: true });
  };

  return (
    <>
      <Container className="py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm flex-wrap">
            <li>
              <Link to={ROUTES.HOME} className="text-gray-500 hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>
              <i className="fas fa-chevron-right text-gray-400 text-xs" aria-hidden="true" />
            </li>
            <li>
              <Link to={ROUTES.MANAGE_LISTINGS} className="text-gray-500 hover:text-primary-600">
                Manage Products
              </Link>
            </li>
            <li>
              <i className="fas fa-chevron-right text-gray-400 text-xs" aria-hidden="true" />
            </li>
            <li className="text-gray-900 dark:text-white">Add Product</li>
          </ol>
        </nav>
      </Container>

      <Container className="max-w-4xl py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-primary-600 text-white px-6 sm:px-8 py-6">
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-primary-100 mt-2">Share your fresh produce with customers</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    id="productName"
                    name="productName"
                    type="text"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    required
                    className={INPUT_CLASS}
                    placeholder="e.g., Organic Tomatoes"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                    className={INPUT_CLASS}
                  >
                    {PRODUCT_FORM_CATEGORIES.map((item) => (
                      <option key={item.value || 'default'} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                    className={INPUT_CLASS}
                    placeholder="Describe your product, growing methods, quality, etc."
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price per Unit (৳) *
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                    className={INPUT_CLASS}
                    placeholder="45.00"
                  />
                </div>
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Unit *
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={unit}
                    onChange={(event) => setUnit(event.target.value)}
                    required
                    className={INPUT_CLASS}
                  >
                    {PRODUCT_FORM_UNITS.map((item) => (
                      <option key={item.value || 'default'} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Stock *
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                    required
                    className={INPUT_CLASS}
                    placeholder="100"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Product Images
              </h2>
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Images (Max {MAX_PRODUCT_IMAGES} images) *
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                  <label htmlFor="images" className="cursor-pointer block">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4" aria-hidden="true" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Click to upload images
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </label>
                </div>
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={preview}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Farm Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="farmLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Farm Location *
                  </label>
                  <input
                    id="farmLocation"
                    name="farmLocation"
                    type="text"
                    value={farmLocation}
                    onChange={(event) => setFarmLocation(event.target.value)}
                    required
                    className={INPUT_CLASS}
                    placeholder="e.g., Sylhet, Bangladesh"
                  />
                </div>
                <div>
                  <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Harvest Date
                  </label>
                  <input
                    id="harvestDate"
                    name="harvestDate"
                    type="date"
                    value={harvestDate}
                    onChange={(event) => setHarvestDate(event.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Product Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCT_FEATURES.map((feature) => (
                  <label
                    key={feature.value}
                    className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="features"
                      value={feature.value}
                      checked={features.includes(feature.value)}
                      onChange={() => handleFeatureToggle(feature.value)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{feature.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {formError && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddProductPage;
