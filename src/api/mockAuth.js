import { DUMMY_USERS } from '@data/auth';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createAxiosResponse = (config, data, status = 200) => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
  headers: {},
  config,
  request: {},
});

const sanitizeUser = ({ password: _password, ...safeUser }) => safeUser;

const findUser = (email, password, role) =>
  DUMMY_USERS.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password &&
      user.role === role,
  );

export const resolveMockResponse = async (config) => {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();

  if (method === 'post' && url.endsWith('/auth/login')) {
    await delay(600);
    const { email, password, role } = JSON.parse(config.data || '{}');
    const user = findUser(email, password, role);

    if (!user) {
      return createAxiosResponse(
        config,
        { message: 'Invalid email, password, or account type.' },
        401,
      );
    }

    return createAxiosResponse(config, {
      token: `ov-dummy-token-${user.id}`,
      user: sanitizeUser(user),
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
    const user = DUMMY_USERS.find((item) => `ov-dummy-token-${item.id}` === token);

    if (!user) {
      return createAxiosResponse(config, { message: 'Unauthorized' }, 401);
    }

    return createAxiosResponse(config, { user: sanitizeUser(user) });
  }

  return null;
};
