import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import { USER_ROLES } from '@constants/storage';
import { useAuth } from '@hooks/useAuth';

const ROLE_LABELS = {
  [USER_ROLES.CUSTOMER]: 'Customer',
  [USER_ROLES.FARMER]: 'Farmer',
};

const ProfileDropdown = ({ onNavigate }) => {
  const { user, logout, isFarmer } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const closeMenu = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate(ROUTES.HOME);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 p-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <img src={user.avatar} alt="" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" />
        <span className="hidden xl:inline text-sm max-w-[120px] truncate">{user.name}</span>
        <i
          className={`fas fa-chevron-down text-xs hidden xl:inline transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
          role="menu"
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
              {ROLE_LABELS[user.role]}
            </span>
          </div>

          <Link
            to={ROUTES.PROFILE}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            onClick={closeMenu}
            role="menuitem"
          >
            <i className="fas fa-user w-4" aria-hidden="true" />
            My Profile
          </Link>

          {isFarmer ? (
            <Link
              to={ROUTES.MANAGE_LISTINGS}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              onClick={closeMenu}
              role="menuitem"
            >
              <i className="fas fa-list w-4" aria-hidden="true" />
              Manage Listing
            </Link>
          ) : (
            <Link
              to={ROUTES.ORDERS}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              onClick={closeMenu}
              role="menuitem"
            >
              <i className="fas fa-box w-4" aria-hidden="true" />
              My Orders
            </Link>
          )}

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
  );
};

export default ProfileDropdown;
