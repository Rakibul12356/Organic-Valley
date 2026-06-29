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

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 min-h-16 py-2 lg:py-0 lg:h-16">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 sm:gap-3 min-w-0 shrink"
            onClick={closeMobileMenu}
          >
            <div className="bg-primary-500 p-1.5 sm:p-2 rounded-lg shrink-0">
              <i className="fas fa-seedling text-white text-lg sm:text-xl" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
                Organic Valley
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 truncate">
                Fresh Organic Products
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
            {/* Desktop search */}
            <div className="hidden lg:block relative">
              <label htmlFor="navbar-search" className="sr-only">
                Search products
              </label>
              <input
                id="navbar-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="w-44 xl:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <i
                className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                aria-hidden="true"
              />
            </div>

            <Link
              to={ROUTES.CART}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Cart with ${cartCount} items`}
            >
              <i className="fas fa-shopping-cart text-lg sm:text-xl" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to={ROUTES.PROFILE}
              className="hidden sm:flex items-center gap-2 p-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="User profile"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt=""
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
              />
              <span className="hidden xl:inline text-sm">John Doe</span>
              <i className="fas fa-chevron-down text-xs hidden xl:inline" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`fas text-lg sm:text-xl ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <i
                className={`fas text-lg sm:text-xl ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Mobile & tablet menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-base ${navLinkClass({ isActive })}`
                  }
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="relative mt-4 px-1">
              <label htmlFor="navbar-search-mobile" className="sr-only">
                Search products
              </label>
              <input
                id="navbar-search-mobile"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <i
                className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                aria-hidden="true"
              />
            </div>

            <Link
              to={ROUTES.PROFILE}
              className="sm:hidden flex items-center gap-3 mt-4 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              onClick={closeMobileMenu}
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">John Doe</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
