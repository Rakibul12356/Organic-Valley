import { Link } from 'react-router-dom';
import { Container } from '@components/common';
import { ROUTES } from '@constants';

const ProductBreadcrumb = ({ productName }) => {
  return (
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
          <li>
            <Link to={ROUTES.PRODUCTS} className="text-gray-500 hover:text-primary-600">
              Products
            </Link>
          </li>
          <li>
            <i className="fas fa-chevron-right text-gray-400 text-xs" aria-hidden="true" />
          </li>
          <li className="text-gray-900 dark:text-white">{productName}</li>
        </ol>
      </nav>
    </Container>
  );
};

export default ProductBreadcrumb;
