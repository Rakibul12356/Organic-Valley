import { Container } from '@components/common';
import { ABOUT_MISSION_IMAGE } from '@data/about';

const AboutMission = () => {
  return (
    <Container className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            To revolutionize the way people access fresh, organic produce by creating a direct
            connection between local farmers and consumers. We believe in supporting sustainable
            agriculture while providing communities with the freshest, most nutritious food
            possible.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Through our platform, we empower farmers to reach wider markets, earn fair prices for
            their produce, and build lasting relationships with customers who value quality and
            sustainability.
          </p>
        </div>
        <div className="relative">
          <img
            src={ABOUT_MISSION_IMAGE}
            alt="Farm landscape"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </div>
    </Container>
  );
};

export default AboutMission;
