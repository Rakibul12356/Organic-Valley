import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@components/common';
import { ROUTES } from '@constants';
import { PRODUCTS_LIST } from '@data/products';

const INITIAL_CART_ITEMS = PRODUCTS_LIST.slice(0, 3).map((product, index) => ({
  id: `cart-${product.id}`,
  slug: product.id,
  name: product.name,
  image: product.image,
  farmer: product.farmer,
  unit: product.unit,
  price: product.price,
  quantity: index + 1,
}));

const DELIVERY_FEE = 60;

const CartPage = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState('');

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const discount = useMemo(() => (subtotal > 1000 ? Math.round(subtotal * 0.05) : 0), [subtotal]);
  const total = Math.max(0, subtotal + DELIVERY_FEE - discount);

  const updateQuantity = (id, nextQuantity) => {
    if (nextQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item)),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
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
            <li className="text-gray-900 dark:text-white">Cart</li>
          </ol>
        </nav>
      </Container>

      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {cartItems.length} item{cartItems.length === 1 ? '' : 's'} in your cart
            </p>
          </div>
          <Link
            to={ROUTES.PRODUCTS}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add fresh products from local farmers to get started.
            </p>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-28 h-28 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <Link
                        to={`/products/${item.slug}`}
                        className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        By {item.farmer}
                      </p>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold mt-2">
                        ৳{item.price}
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.unit}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <i className="fas fa-minus text-xs" aria-hidden="true" />
                        </button>
                        <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <i className="fas fa-plus text-xs" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ৳{item.price * item.quantity}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">৳{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                  <span className="font-medium text-gray-900 dark:text-white">৳{DELIVERY_FEE}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Discount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">-৳{discount}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    ৳{total}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="promo-code"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-code"
                    type="text"
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
};

export default CartPage;
