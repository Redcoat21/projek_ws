const Joi = require("joi");

const validateLoginSchema = Joi.object({
    username: Joi.string().label("Username").required(),
    password: Joi.string().label("Password").required(),
    remember_me: Joi.boolean().label("Remember Me").required(),
}).messages({
    "any.required": "{{#label}} is required"
});

const validateRegisterSchema = Joi.object({
    username: Joi.string().label("Username").required(),
    password: Joi.string().label("Password").required(),
    email: Joi.string().email().label("Email").required(),
    phone_number: Joi.string()
        .regex(/^(?:\+\d{1,3})?(?:\d{3,5}(?:[\s-]?\d{3,5}){2}|\d{9,11})$/)
        .label("Phone Number")
        .required(),
    role: Joi.string().min(3).max(3).label("Role").required().valid("USR", "SLR"),
    name: Joi.string().label("Name").required(),
    address: Joi.string().pattern(
        /^.+?,\s*\d{5},\s*.+?,\s*.+?,\s*.+?$/
    ).required().label("Address").messages({
        'string.pattern.base': "Address must be in street_address, postal_code, city, provinces, country format"
    })
}).messages({
    "any.required": "{{#label}} is required"
});

module.exports = {
    validateLoginSchema,
    validateRegisterSchema,
};
