import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-primary-100 mb-8">
          Get notified about new farmers, seasonal produce, and special offers
        </p>

        <form
          className="flex flex-col sm:flex-row max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-900"
          />
          <button
            type="submit"
            className="bg-primary-800 hover:bg-primary-900 text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium transition mt-3 sm:mt-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
