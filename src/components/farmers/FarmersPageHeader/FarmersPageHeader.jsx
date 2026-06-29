import { Container } from '@components/common';

const FarmersPageHeader = () => {
  return (
    <div className="bg-primary-600 text-white py-16">
      <Container className="text-center">
        <h1 className="text-4xl font-bold mb-4">Meet Our Farmers</h1>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
          Discover the passionate farmers who grow fresh, organic produce with care and dedication
        </p>
      </Container>
    </div>
  );
};

export default FarmersPageHeader;
