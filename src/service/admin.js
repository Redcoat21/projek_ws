const { Role, SubscriptionTier } = require('../model');

const getAllRoles = async () => {
    return await Role.findAll();
}

const getAllTiers = async () => {
    return await SubscriptionTier.findAll();
}

module.exports = {
    getAllRoles,
    getAllTiers,
}