const Joi = require("joi");

const validateUpdateData = Joi.object({
    email: Joi.string().email().allow('').messages({
        "string.email": "Format email salah!",
    }),
    phone_number: Joi.string()
        .regex(/^(?:\+\d{1,3})?(?:\d{3,5}(?:[\s-]?\d{3,5}){2}|\d{9,11})$/)
        .allow('')
        .messages({
            "string.pattern.base": "Format nomor telepon salah!",
        }),
    name: Joi.string().allow('').messages({
        "any.string": "Format nama salah!"
    }),
}).unknown(true);

module.exports = {
    validateUpdateData,
}