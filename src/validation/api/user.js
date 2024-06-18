const Joi = require("joi");

const validateCartSchemaObject = Joi.object({
    id: Joi.string().required(),//.pattern(/^(?:\d{9}X|\d{10})$/).pattern(/^\d{13}$/),
    amount: Joi.number().required().min(1)
});

const validateCartSchemaArray = Joi.array().items(validateCartSchemaObject);
const validateCartSchema = Joi.alternatives(validateCartSchemaObject, validateCartSchemaArray);

const validateCheckoutSchema = Joi.object({
    courier_choice: Joi.string().valid('jne', 'tiki').required().messages({
        "any.only": "Please choose from one of the available courier (jne, tiki)",
        "any.required": "Courier choice must be provided"
    }),
    service_choice: Joi.when('courier_choice', {
        is: 'jne',
        then: Joi.string().valid('OKE', 'REG', 'YES').required().messages({
            "any.only": "For JNE, the valid services are (OKE, REG, YES)",
        }),
        otherwise: Joi.when('courier_choice', {
            is: 'tiki',
            then: Joi.string().valid('ECO', 'REG').required().messages({
                "any.only": "For TIKI, the valid services are (ECO, REG)1"
            }),
        })
    }).messages({
        "any.required": "Service choice must be provided"
    })
});

const createUserSchema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().required(),
});

const subscribeSchema = Joi.object({
    tier: Joi.string().valid("Premium", "Silver", "Gold").required().messages({
        "any.only": "Valid tiers are Premium, Silver, Gold"
    })
})

module.exports = {
    validateCartSchema,
    validateCheckoutSchema,
    createUserSchema,
    subscribeSchema
}