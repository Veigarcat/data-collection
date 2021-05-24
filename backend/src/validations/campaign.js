const { Joi, validate } = require('express-validation');

const create = {
  body: Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    desc: Joi.string(),
    timeStart: Joi.date().default(new Date()),
    timeEnd: Joi.date().required(),
    criteria: Joi.array().items(Object),
    usecaseList: Joi.array().items(Object),
    intentList: Joi.array().items(Object),
    participant: Joi.array().items(Object),
    messageType: Joi.string(),
    messageObject: Joi.string(),
    collectType: Joi.string(),
    scope: Joi.string(),
    appId: Joi.string().empty('').default(''),
  }),
};
const userJoin = {
  body: Joi.object({
    userId: Joi.string(),
    campaignId: Joi.string(),
  }),
};

module.exports = {
  creatCampaignValidate: validate(create, { keyByField: true }),
  userJoinValidate: validate(userJoin, { keyByField: true }),
};
