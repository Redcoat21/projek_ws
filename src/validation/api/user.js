const Joi = require("joi");

const validateCartSchemaObject = Joi.object({
    id: Joi.string().required(),//.pattern(/^(?:\d{9}X|\d{10})$/).pattern(/^\d{13}$/),
    amount: Joi.number().required().min(1)
});

const validateCartSchemaArray = Joi.array().items(validateCartSchemaObject);
const validateCartSchema = Joi.alternatives(validateCartSchemaObject, validateCartSchemaArray);

module.exports = {
    validateCartSchema
}