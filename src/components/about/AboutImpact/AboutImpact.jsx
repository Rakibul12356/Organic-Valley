import { Container } from '@components/common';
import { ABOUT_IMPACT_STATS } from '@data/about';

const AboutImpact = () => {
  return (
    <section className="bg-primary-600 text-white py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-xl text-primary-100">
            Making a difference in communities across Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {ABOUT_IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutImpact;
