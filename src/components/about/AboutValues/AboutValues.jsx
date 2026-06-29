import { Container } from '@components/common';
import { ABOUT_VALUES } from '@data/about';

const AboutValues = () => {
  return (
    <section className="bg-white dark:bg-gray-800 py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These core values guide everything we do and shape our commitment to farmers and
            customers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ABOUT_VALUES.map((value) => (
            <div key={value.id} className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i
                  className={`fas ${value.icon} text-2xl text-primary-600 dark:text-primary-400`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutValues;
