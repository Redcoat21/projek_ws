const Joi = require("joi");

const createRoleSchema = Joi.object({
    id: Joi.string().length(3).required(),
    name: Joi.string().required(),
});

module.exports = {
    createRoleSchema
}