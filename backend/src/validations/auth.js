const { Joi, validate } = require('express-validation');
const { SSO_EVENT } = require('../constants/params');

const ssoUser = {
  body: Joi.object({
    event: Joi.string()
      .valid(SSO_EVENT.CREATE_USER, SSO_EVENT.SET_TOKEN, SSO_EVENT.LOGOUT)
      .required(),
    data: Joi.object().required(),
  }),
};

module.exports = {
  ssoUserValidate: validate(ssoUser, { keyByField: true }),
};
