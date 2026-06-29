import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';

const ProfileSidebar = ({ user, isFarmer }) => {
  const quickLinks = isFarmer
    ? [
        { to: ROUTES.MANAGE_LISTINGS, icon: 'fa-list', label: 'Manage Listings' },
        { to: ROUTES.ADD_PRODUCT, icon: 'fa-plus-circle', label: 'Add Product' },
      ]
    : [
        { to: ROUTES.ORDERS, icon: 'fa-box', label: 'My Orders' },
        { to: ROUTES.CART, icon: 'fa-shopping-cart', label: 'My Cart' },
      ];

  return (
    <aside className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
        <nav className="space-y-1">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <i className={`fas ${link.icon} w-4 text-primary-600 dark:text-primary-400`} aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account</h2>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Member since</dt>
            <dd className="font-medium text-gray-900 dark:text-white">2024</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Account type</dt>
            <dd className="font-medium text-gray-900 dark:text-white capitalize">{user.role}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="font-medium text-gray-900 dark:text-white break-all">{user.email}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
