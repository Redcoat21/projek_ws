const Joi = require("joi");
const createSubscriptionTierSchema = Joi.object({
    name: Joi.string().max(50).required(),
    price: Joi.number().integer().min(0).required(),
});

module.exports = {
    createSubscriptionTierSchema
}