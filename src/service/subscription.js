const { Subscription } = require("../model");
const getSubscription = async (id) => {
    return (await Subscription.findByPk(id))
}

module.exports = {
    getSubscription
}