import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import { STORAGE_KEYS } from '@constants/storage';
import { useAuth } from '@hooks/useAuth';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/dashboard/products': 'Products',
  '/dashboard/orders': 'Orders',
  '/dashboard/users': 'Users',
};

const getInitialDarkMode = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return savedTheme === 'dark' || (!savedTheme && prefersDark);
};

const AdminHeader = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(STORAGE_KEYS.THEME, next ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg"
            aria-label="Open menu"
          >
            <i className="fas fa-bars text-lg" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
              {pageTitle}
            </h1>
            <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
              Welcome back, {user?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden md:block relative">
            <label htmlFor="admin-search" className="sr-only">
              Search
            </label>
            <input
              id="admin-search"
              type="search"
              placeholder="Search..."
              className="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <i
              className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              aria-hidden="true"
            />
          </div>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg"
            aria-label="Notifications"
          >
            <i className="fas fa-bell" aria-hidden="true" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
            >
              <img
                src={user?.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                {user?.name}
              </span>
              <i className="fas fa-chevron-down text-xs text-gray-500 hidden sm:block" aria-hidden="true" />
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                role="menu"
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                    Admin
                  </span>
                </div>
                <Link
                  to={ROUTES.HOME}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  onClick={() => setIsProfileOpen(false)}
                  role="menuitem"
                >
                  <i className="fas fa-store w-4" aria-hidden="true" />
                  View Store
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  role="menuitem"
                >
                  <i className="fas fa-sign-out-alt w-4" aria-hidden="true" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
