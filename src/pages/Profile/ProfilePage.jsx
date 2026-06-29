import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@components/common';
import { ProfileSidebar } from '@components/profile';
import { ROUTES } from '@constants';
import { USER_ROLES } from '@constants/storage';
import { FARM_SPECIALIZATIONS, FARM_SIZE_UNITS } from '@data/register';
import { useAuth } from '@hooks/useAuth';

const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const ROLE_LABELS = {
  [USER_ROLES.CUSTOMER]: 'Customer',
  [USER_ROLES.FARMER]: 'Farmer',
};

const buildFormState = (user) => ({
  name: user?.name || '',
  phone: user?.phone || '',
  address: user?.address || '',
  bio: user?.bio || '',
  avatar: user?.avatar || '',
  farmName: user?.farmName || '',
  specialization: user?.specialization || '',
  farmSize: user?.farmSize || '',
  farmSizeUnit: user?.farmSizeUnit || 'acres',
});

const ProfilePage = () => {
  const { user, isFarmer, updateProfile } = useAuth();
  const [form, setForm] = useState(() => buildFormState(user));
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const displayAvatar = isEditing ? form.avatar : user.avatar;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
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
        setForm((prev) => ({ ...prev, avatar: reader.result }));
        setFormError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setForm(buildFormState(user));
    setIsEditing(false);
    setFormError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setSuccessMessage('');

    if (!form.name.trim()) {
      setFormError('Name is required.');
      return;
    }

    if (isFarmer && !form.farmName.trim()) {
      setFormError('Farm name is required.');
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        bio: form.bio.trim(),
        avatar: form.avatar,
        ...(isFarmer && {
          farmName: form.farmName.trim(),
          specialization: form.specialization,
          farmSize: form.farmSize,
          farmSizeUnit: form.farmSizeUnit,
        }),
      };

      await updateProfile(payload);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully.');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Container className="py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to={ROUTES.HOME} className="text-gray-500 hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>
              <i className="fas fa-chevron-right text-gray-400 text-xs" aria-hidden="true" />
            </li>
            <li className="text-gray-900 dark:text-white">My Profile</li>
          </ol>
        </nav>
      </Container>

      <Container className="pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-24 sm:h-28" />
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-10">
                  <div className="relative shrink-0">
                    <img
                      src={displayAvatar}
                      alt=""
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-gray-800 object-cover shadow-lg"
                    />
                    {isEditing && (
                      <label
                        htmlFor="profile-avatar"
                        aria-label="Change profile picture"
                        className="absolute bottom-1 right-1 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg cursor-pointer shadow"
                      >
                        <span className="sr-only">Change profile picture</span>
                        <i className="fas fa-camera text-sm" aria-hidden="true" />
                        <input
                          id="profile-avatar"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {user.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                    <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                      {ROLE_LABELS[user.role]}
                    </span>
                  </div>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setForm(buildFormState(user));
                        setIsEditing(true);
                        setSuccessMessage('');
                      }}
                      className="shrink-0 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
                    >
                      <i className="fas fa-edit mr-2" aria-hidden="true" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {successMessage && (
              <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-green-700 dark:text-green-300 text-sm">
                <i className="fas fa-check-circle mr-2" aria-hidden="true" />
                {successMessage}
              </div>
            )}

            {formError && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-red-700 dark:text-red-300 text-sm">
                <i className="fas fa-exclamation-circle mr-2" aria-hidden="true" />
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={INPUT_CLASS}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className={`${INPUT_CLASS} opacity-70 cursor-not-allowed`}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+880 1XXX XXXXXX"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={form.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Your delivery address"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={form.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Tell us a little about yourself"
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>
              </div>

              {isFarmer && (
                <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Farm Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Farm Name
                      </label>
                      <input
                        id="farmName"
                        name="farmName"
                        type="text"
                        value={form.farmName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={INPUT_CLASS}
                        required={isFarmer}
                      />
                    </div>
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Specialization
                      </label>
                      <select
                        id="specialization"
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={INPUT_CLASS}
                      >
                        {FARM_SPECIALIZATIONS.map((option) => (
                          <option key={option.value || 'default'} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Farm Size
                        </label>
                        <input
                          id="farmSize"
                          name="farmSize"
                          type="number"
                          min="0"
                          step="0.1"
                          value={form.farmSize}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={INPUT_CLASS}
                        />
                      </div>
                      <div className="w-32">
                        <label htmlFor="farmSizeUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Unit
                        </label>
                        <select
                          id="farmSizeUnit"
                          name="farmSizeUnit"
                          value={form.farmSizeUnit}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={INPUT_CLASS}
                        >
                          {FARM_SIZE_UNITS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white rounded-lg font-medium transition"
                  >
                    {isSaving ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2" aria-hidden="true" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          <ProfileSidebar user={user} isFarmer={isFarmer} />
        </div>
      </Container>
    </>
  );
};

export default ProfilePage;
