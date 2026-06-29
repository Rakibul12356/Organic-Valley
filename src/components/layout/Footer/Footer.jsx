import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';
import { appConfig } from '@config/env';

const QUICK_LINKS = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Products', to: ROUTES.PRODUCTS },
  { label: 'Farmers', to: ROUTES.FARMERS },
  { label: 'About Us', to: ROUTES.ABOUT },
];

const FARMER_LINKS = [
  { label: 'Join as Farmer', to: ROUTES.REGISTER },
  { label: 'Add Products', to: ROUTES.DASHBOARD },
  { label: 'Manage Listings', to: ROUTES.DASHBOARD },
  { label: 'Farmer Support', to: ROUTES.CONTACT },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', to: ROUTES.CONTACT },
  { label: 'Contact Us', to: ROUTES.CONTACT },
  { label: 'Terms of Service', to: ROUTES.CONTACT },
  { label: 'Privacy Policy', to: ROUTES.CONTACT },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'fab fa-facebook' },
  { label: 'Twitter', href: '#', icon: 'fab fa-twitter' },
  { label: 'Instagram', href: '#', icon: 'fab fa-instagram' },
];

const FooterLinkList = ({ title, links }) => (
  <div>
    <h4 className="font-semibold mb-4">{title}</h4>
    <ul className="space-y-2 text-gray-400">
      {links.map((link) => (
        <li key={link.label}>
          <Link to={link.to} className="hover:text-white transition">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to={ROUTES.HOME} className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-500 p-2 rounded-lg">
                <i className="fas fa-seedling text-white text-xl" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{appConfig.name}</h3>
                <p className="text-sm text-gray-400">Fresh Organic Products</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Connecting communities with fresh, local produce directly from farmers.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition"
                  aria-label={social.label}
                >
                  <i className={social.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkList title="Quick Links" links={QUICK_LINKS} />
          <FooterLinkList title="For Farmers" links={FARMER_LINKS} />
          <FooterLinkList title="Support" links={SUPPORT_LINKS} />
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} {appConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
