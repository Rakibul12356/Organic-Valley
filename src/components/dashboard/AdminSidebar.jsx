import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTES, ROUTES } from '@constants';

const NAV_ITEMS = [
  { to: ADMIN_ROUTES.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-line', end: true },
  { to: ADMIN_ROUTES.PRODUCTS, label: 'Products', icon: 'fa-box', end: false },
  { to: ADMIN_ROUTES.ORDERS, label: 'Orders', icon: 'fa-shopping-bag', end: false },
  { to: ADMIN_ROUTES.USERS, label: 'Users', icon: 'fa-users', end: false },
];

const linkClass = ({ isActive }) =>
  [
    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition',
    isActive
      ? 'bg-primary-600 text-white shadow-md'
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50',
  ].join(' ');

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <NavLink to={ADMIN_ROUTES.DASHBOARD} className="flex items-center gap-2 min-w-0" onClick={onClose}>
              <div className="bg-primary-500 p-2 rounded-lg shrink-0">
                <i className="fas fa-seedling text-white" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 dark:text-white truncate">Organic Valley</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            </NavLink>
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close menu"
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={onClose}
              >
                <i className={`fas ${item.icon} w-5 text-center`} aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <NavLink
              to={ROUTES.HOME}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition"
              onClick={onClose}
            >
              <i className="fas fa-external-link-alt w-5 text-center" aria-hidden="true" />
              View Store
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
