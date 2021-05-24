const asyncMiddleware = require('./async');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');
const authService = require('../services/auth');
const { CLIENT_SECRET } = require('../configs');
const redisConnect = require('../utils/redisConnect');

const isLogin = (req, res, next) => {
  redisConnect.get('accessToken', (err, value) => {
    if (err) throw new CustomError(codes.CONVERT_LOGIN);
    req.accessToken = value;
  });
  next();
};

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');

  if (tokenType !== 'Bearer') throw new Error(codes.UNAUTHORIZED);
  if (typeof accessToken === 'undefined' || accessToken === 'null')
    throw new Error();
  const user = await authService.verifyAccessToken(accessToken);

  req.user = user;

  if (
    ['/auths/logout', '/auths/verify', '/user/edit-user'].includes(req.path)
  ) {
    req.accessToken = accessToken;
  }
  return next();
};

const checkAuthClientSecret = async (req, res, next) => {
  const clientSecret = req.headers['client-secret'];
  if (!clientSecret) throw new CustomError(codes.UNAUTHORIZED);

  if (clientSecret !== CLIENT_SECRET) throw new CustomError(codes.UNAUTHORIZED);
  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
  checkAuthClientSecret: asyncMiddleware(checkAuthClientSecret),
  isLogin: asyncMiddleware(isLogin),
};
