import { Container } from '@components/common';
import { WHY_CHOOSE_US } from '../data';

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Organic Valley?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We connect you directly with local farmers for the freshest produce
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.id} className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i
                  className={`fas ${item.icon} text-2xl text-primary-600 dark:text-primary-400`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
