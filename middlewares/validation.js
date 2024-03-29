const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string()
      .required()
      .messages({ "string.empty": 'The "password" field must be filled in' }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// const validateAuth = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email().messages({
//       "string.empty": 'The "email" field must be filled in',
//       "string.email": 'The "email" field must be a valid email',
//     }),
//     password: Joi.string()
//       .required()
//       .messages({ "string.empty": 'The "password" field must be filled in' }),
//   }),
// });

// const validateId = celebrate({
//   params: Joi.object().keys({
//     articleId: Joi.string()
//       .length(2)
//       .regex(/^[A-Fa-f0-9]{24}$/)
//       .messages({
//         "string.length": `The "id" field is not a valid length`,
//       }),
//   }),
// });

const validateSavedArticle = celebrate({
  body: Joi.object().keys({
    key: Joi.string(),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    description: Joi.string().allow(null),
    publishedAt: Joi.date().required().messages({
      "string.empty": 'The "date" field must be filled in',
    }),
    source: Joi.object().keys({
      id: Joi.string().allow(null),
      name: Joi.string().required().messages({
        "string.empty": 'The "name" field must be filled in',
      }),
    }),
    url: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'the "link" field must be a valid url',
    }),
    urlToImage: Joi.string().uri().allow(null),
    keyword: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    category: Joi.string(),
  }),
});

module.exports = {
  validateUserLogin,
  validateCreateUser,
  validateUrl,
  validateSavedArticle,
};
