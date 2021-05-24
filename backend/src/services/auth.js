const axios = require('axios');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const userDao = require('../daos/user');
const {
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
  API_DOMAIN_SLU,
  API_DOMAIN_ASR,
} = require('../configs');
const redisConnect = require('../utils/redisConnect');
const { SSO_EVENT } = require('../constants/params');

const createUserExternal = async (user) => {
  Promise.all([
    await axios({
      method: 'POST',
      url: `${API_DOMAIN_SLU}/api/sso/users`,
      data: { user },
    }),
    await axios({
      method: 'POST',
      url: `${API_DOMAIN_ASR}/api/sso/users`,
      data: { user },
    }),
  ]);
};

const loginExternal = async (accessToken) => {
  Promise.all([
    await axios({
      method: 'POST',
      url: `${API_DOMAIN_SLU}/api/sso/users/token`,
      data: { accessToken },
    }),
    await axios({
      method: 'POST',
      url: `${API_DOMAIN_ASR}/api/sso/users/token`,
      data: { accessToken },
    }),
  ]);
};

const logoutExternal = async (accessToken) => {
  Promise.all([
    await axios({
      method: 'POST',
      url: `${API_DOMAIN_SLU}/api/sso/users/logout`,
      data: { accessToken },
    }),
    await axios({
      method: 'POST',
      url: `${API_DOMAIN_ASR}/api/sso/users/logout`,
      data: { accessToken },
    }),
  ]);
};

const createClientUser = async (user) => {
  const { ssoUserId } = user;
  const userFind = await userDao.findUser({ ssoUserId });
  if (userFind) throw new CustomError(errorCodes.USER_EXIST);
  const userCreate = await userDao.createClientUser(user);
  await createUserExternal(user);
  return userCreate;
};

const saveAccessToken = async (data) => {
  const { accessToken } = data;
  await redisConnect.setex('accessToken', JWT_EXPIRES_TIME, accessToken);
  await loginExternal(accessToken);
};

const logout = async (data) => {
  const { accessToken } = data;
  await redisConnect.del('accessToken');
  await logoutExternal(accessToken);
};

const actionRelativeSso = async ({ event, data }) => {
  if (event === SSO_EVENT.CREATE_USER) {
    return createClientUser(data);
  }
  if (event === SSO_EVENT.SET_TOKEN) {
    return saveAccessToken(data);
  }
  if (event === SSO_EVENT.LOGOUT) {
    return logout(data);
  }
  return null;
};

const verifyAccessToken = async (accessToken) => {
  redisConnect.get('accessToken', (err) => {
    if (err) throw new CustomError(errorCodes.UNAUTHORIZED);
  });

  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  const { ssoUserId } = data;

  const user = await userDao.findUser({ ssoUserId });
  if (!user) throw new CustomError(errorCodes.UNAUTHORIZED);
  return user;
};

module.exports = {
  verifyAccessToken,
  actionRelativeSso,
};
