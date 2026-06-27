import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';
import { HOME_CATEGORIES } from '../data';

const Categories = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover fresh, locally-sourced produce across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {HOME_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={ROUTES.CATEGORIES}
              className="group cursor-pointer"
            >
              <div
                className={`${category.cardClass} rounded-2xl p-6 text-center transition`}
              >
                <i
                  className={`fas ${category.icon} text-3xl ${category.iconClass} mb-3`}
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.itemCount}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
