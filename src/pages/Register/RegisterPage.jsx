import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, USER_ROLES } from '@constants';
import { appConfig } from '@config/env';
import {
  REGISTER_ROLE_OPTIONS,
  FARM_SPECIALIZATIONS,
  FARM_SIZE_UNITS,
  DEFAULT_AVATAR_PREVIEW,
} from '@data/register';
import { useAuth } from '@hooks/useAuth';

const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, isAuthenticated } = useAuth();

  const [userType, setUserType] = useState(USER_ROLES.CUSTOMER);
  const [profilePreview, setProfilePreview] = useState(DEFAULT_AVATAR_PREVIEW);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [farmName, setFarmName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [farmSizeUnit, setFarmSizeUnit] = useState('acres');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState('');

  const isFarmer = userType === USER_ROLES.FARMER;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setFormError('Profile picture must be 2MB or smaller.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfilePreview(reader.result);
        setFormError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setFormError('Please accept the Terms and Conditions.');
      return;
    }

    if (isFarmer && !farmName.trim()) {
      setFormError('Farm name is required for farmers.');
      return;
    }

    try {
      const newUser = await register({
        role: userType,
        firstName,
        lastName,
        email,
        phone,
        address,
        bio,
        password,
        confirmPassword,
        avatar: profilePreview !== DEFAULT_AVATAR_PREVIEW ? profilePreview : undefined,
        farmName: isFarmer ? farmName : undefined,
        specialization: isFarmer ? specialization : undefined,
        farmSize: isFarmer ? farmSize : undefined,
        farmSizeUnit: isFarmer ? farmSizeUnit : undefined,
      });
      navigate(
        newUser.role === USER_ROLES.FARMER ? ROUTES.MANAGE_LISTINGS : ROUTES.HOME,
        { replace: true },
      );
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-500 p-3 rounded-full">
              <i className="fas fa-seedling text-white text-2xl" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Join {appConfig.name} community today
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 py-8 px-6 sm:px-8 shadow-xl rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  I want to register as:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {REGISTER_ROLE_OPTIONS.map((option) => (
                    <label key={option.value} className="relative group cursor-pointer">
                      <span className="sr-only">{option.label}</span>
                      <input
                        type="radio"
                        name="userType"
                        value={option.value}
                        checked={userType === option.value}
                        onChange={() => setUserType(option.value)}
                        className="sr-only peer"
                      />
                      <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/30 hover:border-primary-300 dark:hover:border-primary-400 transition-all duration-200">
                        <div className="text-center">
                          <i
                            className={`fas ${option.icon} text-2xl mb-3 text-gray-600 dark:text-gray-400 group-has-[:checked]:text-primary-600 transition-colors`}
                            aria-hidden="true"
                          />
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Profile Picture
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="shrink-0">
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex-1 max-w-xs w-full">
                    <label
                      htmlFor="profilePicture"
                      className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 transition block text-center"
                    >
                      <span className="flex items-center justify-center">
                        <i className="fas fa-camera mr-2" aria-hidden="true" />
                        Choose photo
                      </span>
                      <input
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                      className={INPUT_CLASS}
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      autoComplete="email"
                      className={INPUT_CLASS}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      required
                      className={`${INPUT_CLASS} resize-none`}
                      placeholder="Enter your full address"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="new-password"
                        className={`${INPUT_CLASS} pr-10`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <i
                          className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      required
                      className={INPUT_CLASS}
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      className={INPUT_CLASS}
                      placeholder="+880 1234 567890"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      maxLength={250}
                      value={bio}
                      onChange={(event) => setBio(event.target.value)}
                      className={`${INPUT_CLASS} resize-none`}
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Brief description</p>
                      <span className="text-xs text-gray-400">{bio.length}/250</span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                        autoComplete="new-password"
                        className={`${INPUT_CLASS} pr-10`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        <i
                          className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {isFarmer && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Farm Name
                      </label>
                      <input
                        id="farmName"
                        name="farmName"
                        type="text"
                        value={farmName}
                        onChange={(event) => setFarmName(event.target.value)}
                        required={isFarmer}
                        className={INPUT_CLASS}
                        placeholder="Green Valley Farm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="specialization"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Specialization
                      </label>
                      <select
                        id="specialization"
                        name="specialization"
                        value={specialization}
                        onChange={(event) => setSpecialization(event.target.value)}
                        className={INPUT_CLASS}
                      >
                        {FARM_SPECIALIZATIONS.map((item) => (
                          <option key={item.value || 'default'} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Farm Size
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="farmSize"
                        name="farmSize"
                        type="number"
                        min="0"
                        step="0.1"
                        value={farmSize}
                        onChange={(event) => setFarmSize(event.target.value)}
                        className={`${INPUT_CLASS} flex-1`}
                        placeholder="5.5"
                      />
                      <select
                        id="farmSizeUnit"
                        name="farmSizeUnit"
                        value={farmSizeUnit}
                        onChange={(event) => setFarmSizeUnit(event.target.value)}
                        className="w-24 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                      >
                        {FARM_SIZE_UNITS.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Enter the total area of your farm
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                  required
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <button type="button" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    Terms and Conditions
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {formError && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-white py-3 px-4 rounded-lg font-medium transition duration-200 transform hover:scale-105"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200 flex items-center justify-center gap-2"
              >
                <i className="fab fa-google text-red-500" aria-hidden="true" />
                <span>Continue with Google</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
