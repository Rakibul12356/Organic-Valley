import { Container } from '@components/common';

const ProductsPageHeader = () => {
  return (
    <div className="bg-primary-600 text-white py-12">
      <Container>
        <h1 className="text-4xl font-bold mb-4">Fresh Products</h1>
        <p className="text-xl text-primary-100">
          Discover fresh, locally-sourced produce from our trusted farmers
        </p>
      </Container>
    </div>
  );
};

export default ProductsPageHeader;
