const Joi = require("joi");

const validateLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    remember_me: Joi.boolean().required(),
});

// Regexnya buat validate nomor telepon
const validateRegisterSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string()
        .regex(/^(?:\+\d{1,3})?(?:\d{3,5}(?:[\s-]?\d{3,5}){2}|\d{9,11})$/)
        .required(),
    role: Joi.string().min(3).max(3).valid("USR", "SLR"),
    name: Joi.string(),
    address: Joi.string().pattern(
        /^.+,\s*[^,]+,\s*[^,]+,\s*[^,]+$/
    ).required().messages({
        'string.pattern.base': '"{{#label}}" must be in the format: <street_name>, <city>, <provinces>, <country>'
    })
});

module.exports = {
    validateLoginSchema,
    validateRegisterSchema,
};
