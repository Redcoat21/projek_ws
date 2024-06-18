const { Subscription, SubscriptionTier } = require("../model");
const { randomUUID } = require("crypto");
const luxon = require("luxon");
const getSubscription = async (id) => {
    return (await Subscription.findByPk(id))
}

const getSubscriptionTiers = async () => {
    return (await SubscriptionTier.findAll());
}

const addSubscription = async (subscriptionData) => {
    const id = randomUUID();
    const { subscriber, tier } = subscriptionData;
    const subscribedAt = luxon.DateTime.now();
    const expiredAt = subscribedAt.plus({ months: 1 });

    await Subscription.create({
        id,
        subscriber,
        tier,
        subscribedAt,
        expiredAt
    })
}
module.exports = {
    getSubscription,
    getSubscriptionTiers,
    addSubscription
}