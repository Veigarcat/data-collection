const { Joi, validate } = require('express-validation');

const create = {
  body: Joi.object({
    name: Joi.string().required(),
    desc: Joi.string(),
    listIntent: Joi.array().items(
      Joi.object().keys({
        id: Joi.string(),
      }),
    ),
    participant: Joi.array().items(
      Joi.object().keys({
        email: Joi.string(),
        status: Joi.number(),
      }),
    ),
    amount: Joi.number(),
  }),
};

module.exports = {
  createUsecaseValidate: validate(create, { keyByField: true }),
};
