import { Container } from '@components/common';
import { appConfig } from '@config/env';

const AboutHero = () => {
  return (
    <div className="bg-primary-600 text-white py-20">
      <Container className="text-center">
        <h1 className="text-5xl font-bold mb-6">About {appConfig.name}</h1>
        <p className="text-xl text-primary-100 max-w-3xl mx-auto">
          We&apos;re on a mission to connect communities with fresh, local produce while
          supporting sustainable farming practices across Bangladesh.
        </p>
      </Container>
    </div>
  );
};

export default AboutHero;
