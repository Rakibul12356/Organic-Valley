import { Link } from 'react-router-dom';
import { Container } from '@components/common';
import { ROUTES } from '@constants';

const JoinFarmerCTA = () => {
  return (
    <div className="bg-primary-600 text-white py-16">
      <Container className="text-center">
        <h2 className="text-3xl font-bold mb-4">Want to Join Our Farmer Community?</h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Share your fresh produce with thousands of customers and grow your business
        </p>
        <Link
          to={ROUTES.REGISTER}
          className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Join as Farmer
        </Link>
      </Container>
    </div>
  );
};

export default JoinFarmerCTA;
