const { Joi, validate } = require('express-validation');

const create = {
  body: Joi.object({
    messageId: Joi.string().required(),
    ssoUserId: Joi.string(),
    appId: Joi.string().required(),
    campaignId: Joi.string().required(),
    textComment: Joi.string(),
    isConfirm: Joi.boolean(),
    nlu: Joi.object(),
  }),
};

const update = {
  body: Joi.object({
    messageId: Joi.string().required(),
    textComment: Joi.string(),
    isConfirm: Joi.boolean(),
    nlu: Joi.object(),
  }),
};
module.exports = {
  creatMessageValidate: validate(create, { keyByField: true }),
  updateMessageValidate: validate(update, { keyByField: true }),
};
