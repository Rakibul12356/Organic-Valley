import { useParams, Navigate } from 'react-router-dom';
import { Container } from '@components/common';
import { ROUTES } from '@constants';
import { getProductDetails, getRelatedProducts } from '@data/products';
import {
  ProductBreadcrumb,
  ProductGallery,
  ProductInfo,
  ProductTabs,
  ProductReviews,
  RelatedProducts,
} from '@components/product-details';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const product = getProductDetails(productId);

  if (!product) {
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  const relatedProducts = getRelatedProducts(product.slug);

  return (
    <>
      <ProductBreadcrumb productName={product.name} />

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />
        <ProductReviews product={product} />
        <RelatedProducts products={relatedProducts} />
      </Container>
    </>
  );
};

export default ProductDetailsPage;
