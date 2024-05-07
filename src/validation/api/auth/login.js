const Joi = require("joi");

const validateLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {
    validateLoginSchema,
};
