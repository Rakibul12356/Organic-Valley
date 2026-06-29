import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, USER_ROLES } from '@constants';
import { LOGIN_ROLE_OPTIONS } from '@data/auth';
import { useAuth } from '@hooks/useAuth';

const DEMO_CREDENTIALS = {
  [USER_ROLES.CUSTOMER]: {
    email: 'customer@organicvalley.com',
    password: 'password123',
  },
  [USER_ROLES.FARMER]: {
    email: 'farmer@organicvalley.com',
    password: 'password123',
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError, isAuthenticated, isFarmer } = useAuth();
  const [role, setRole] = useState(USER_ROLES.CUSTOMER);
  const [email, setEmail] = useState(DEMO_CREDENTIALS[USER_ROLES.CUSTOMER].email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS[USER_ROLES.CUSTOMER].password);
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || (isFarmer ? ROUTES.MANAGE_LISTINGS : ROUTES.HOME), { replace: true });
    }
  }, [isAuthenticated, isFarmer, from, navigate]);

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setFormError('');
    clearError();
    const demo = DEMO_CREDENTIALS[nextRole];
    setEmail(demo.email);
    setPassword(demo.password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    try {
      const user = await login({ email, password, role });
      const redirectTo =
        user.role === USER_ROLES.FARMER
          ? from || ROUTES.MANAGE_LISTINGS
          : from || ROUTES.HOME;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message);
    }
  };

  const fillDemoCredentials = () => {
    const demo = DEMO_CREDENTIALS[role];
    setEmail(demo.email);
    setPassword(demo.password);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex bg-primary-500 p-3 rounded-xl mb-4">
            <i className="fas fa-seedling text-white text-2xl" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your Organic Valley account</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {LOGIN_ROLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleRoleChange(option.value)}
                className={`p-3 rounded-xl border-2 text-left transition ${
                  role === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <i
                  className={`fas ${option.icon} text-primary-600 dark:text-primary-400 mb-2`}
                  aria-hidden="true"
                />
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{option.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{option.description}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            {(formError || error) && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {formError || error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Use demo {role === USER_ROLES.FARMER ? 'farmer' : 'customer'} credentials
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.REGISTER} className="text-primary-600 dark:text-primary-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
