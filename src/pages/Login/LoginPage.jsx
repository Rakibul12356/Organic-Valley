import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, USER_ROLES } from '@constants';
import { useCurrentUserQuery, useLoginMutation } from '@hooks/auth';
import { getAuthErrorMessage } from '@utils/getAuthErrorMessage';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isFarmer, isAdmin } = useCurrentUserQuery();
  const loginMutation = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (isAuthenticated) {
      const defaultRoute = isAdmin
        ? ROUTES.DASHBOARD
        : isFarmer
          ? ROUTES.MANAGE_LISTINGS
          : ROUTES.HOME;
      navigate(from || defaultRoute, { replace: true });
    }
  }, [isAuthenticated, isFarmer, isAdmin, from, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    try {
      const data = await loginMutation.mutateAsync({
        email: email.trim(),
        password,
      });
      const redirectTo =
        data.user.role === USER_ROLES.ADMIN
          ? from || ROUTES.DASHBOARD
          : data.user.role === USER_ROLES.FARMER
            ? from || ROUTES.MANAGE_LISTINGS
            : from || ROUTES.HOME;
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(getAuthErrorMessage(error, 'Login failed. Please check your credentials.'));
    }
  };

  const displayError =
    formError ||
    getAuthErrorMessage(loginMutation.error, 'Login failed. Please check your credentials.');

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

            {displayError && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {displayError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

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
