import { DUMMY_USERS } from '@data/auth';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const registeredUsers = [];
const profileUpdates = {};

const createAxiosResponse = (config, data, status = 200) => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
  headers: {},
  config,
  request: {},
});

const sanitizeUser = ({ password: _password, ...safeUser }) => safeUser;

const mergeUserProfile = (user) => {
  if (!user) return null;
  return sanitizeUser({ ...user, ...profileUpdates[user.id] });
};

export const getAllUsers = () => [...DUMMY_USERS, ...registeredUsers];

const findUserByCredentials = (email, password, role) =>
  getAllUsers().find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password &&
      user.role === role,
  );

const findUserByToken = (token) =>
  getAllUsers().find((user) => `ov-dummy-token-${user.id}` === token);

const findUserByEmail = (email) =>
  getAllUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());

export const resolveMockResponse = async (config) => {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();

  if (method === 'post' && url.endsWith('/auth/login')) {
    await delay(600);
    const { email, password, role } = JSON.parse(config.data || '{}');
    const user = findUserByCredentials(email, password, role);

    if (!user) {
      return createAxiosResponse(
        config,
        { message: 'Invalid email, password, or account type.' },
        401,
      );
    }

    return createAxiosResponse(config, {
      token: `ov-dummy-token-${user.id}`,
      user: mergeUserProfile(user),
    });
  }

  if (method === 'post' && url.endsWith('/auth/register')) {
    await delay(800);
    const payload = JSON.parse(config.data || '{}');
    const { email, password, confirmPassword, role } = payload;

    if (password !== confirmPassword) {
      return createAxiosResponse(config, { message: 'Passwords do not match.' }, 400);
    }

    if (findUserByEmail(email)) {
      return createAxiosResponse(config, { message: 'An account with this email already exists.' }, 409);
    }

    if (role === 'farmer' && !payload.farmName?.trim()) {
      return createAxiosResponse(config, { message: 'Farm name is required for farmers.' }, 400);
    }

    const newUser = {
      id: `user-${role}-${Date.now()}`,
      name: `${payload.firstName} ${payload.lastName}`.trim(),
      email: payload.email,
      password: payload.password,
      role,
      avatar: payload.avatar || DUMMY_USERS[0].avatar,
      phone: payload.phone,
      address: payload.address,
      bio: payload.bio || '',
      ...(role === 'farmer' && {
        farmName: payload.farmName,
        specialization: payload.specialization,
        farmSize: payload.farmSize,
        farmSizeUnit: payload.farmSizeUnit,
      }),
    };

    registeredUsers.push(newUser);

    return createAxiosResponse(config, {
      token: `ov-dummy-token-${newUser.id}`,
      user: mergeUserProfile(newUser),
    });
  }

  if (method === 'post' && url.endsWith('/auth/logout')) {
    await delay(300);
    return createAxiosResponse(config, { success: true });
  }

  if (method === 'get' && url.endsWith('/auth/me')) {
    await delay(300);
    const authHeader = config.headers?.Authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const user = findUserByToken(token);

    if (!user) {
      return createAxiosResponse(config, { message: 'Unauthorized' }, 401);
    }

    return createAxiosResponse(config, { user: mergeUserProfile(user) });
  }

  if (method === 'patch' && url.endsWith('/auth/profile')) {
    await delay(500);
    const authHeader = config.headers?.Authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const user = findUserByToken(token);

    if (!user) {
      return createAxiosResponse(config, { message: 'Unauthorized' }, 401);
    }

    const payload = JSON.parse(config.data || '{}');
    const allowedFields = [
      'name',
      'phone',
      'address',
      'bio',
      'avatar',
      'farmName',
      'specialization',
      'farmSize',
      'farmSizeUnit',
    ];

    const updates = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => allowedFields.includes(key) && value !== undefined),
    );

    profileUpdates[user.id] = { ...profileUpdates[user.id], ...updates };

    return createAxiosResponse(config, { user: mergeUserProfile(user) });
  }

  return null;
};
