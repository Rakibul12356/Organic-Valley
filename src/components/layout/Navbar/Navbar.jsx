import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@constants';
import { STORAGE_KEYS } from '@constants/storage';

const NAV_LINKS = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Products', to: ROUTES.PRODUCTS },
  { label: 'Farmers', to: ROUTES.FARMERS },
  { label: 'About', to: ROUTES.ABOUT },
];

const navLinkClass = ({ isActive }) =>
  [
    'transition',
    isActive
      ? 'text-primary-600 dark:text-primary-400 font-medium'
      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400',
  ].join(' ');

const getInitialDarkMode = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return savedTheme === 'dark' || (!savedTheme && prefersDark);
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = 3;

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(STORAGE_KEYS.THEME, next ? 'dark' : 'light');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={ROUTES.HOME} className="flex items-center space-x-3" onClick={closeMobileMenu}>
            <div className="bg-primary-500 p-2 rounded-lg">
              <i className="fas fa-seedling text-white text-xl" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Organic Valley</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Fresh Organic Products</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block relative">
              <label htmlFor="navbar-search" className="sr-only">
                Search products
              </label>
              <input
                id="navbar-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400" aria-hidden="true" />
            </div>

            <Link
              to={ROUTES.CART}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Cart with ${cartCount} items`}
            >
              <i className="fas fa-shopping-cart text-xl" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <Link
                to={ROUTES.PROFILE}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="User profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:block">John Doe</span>
                <i className="fas fa-chevron-down text-sm" aria-hidden="true" />
              </Link>
            </div>

            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <i
                className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `block px-2 py-1 ${navLinkClass({ isActive })}`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="relative sm:hidden pt-2">
              <label htmlFor="navbar-search-mobile" className="sr-only">
                Search products
              </label>
              <input
                id="navbar-search-mobile"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
