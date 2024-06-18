const { SubscriptionTier } = require("../../model");
const { createSubscriptionTierSchema } = require("../../validation/api/tier");
const createOneTier = async (req, res) => {
    try {
        const { error, value } = createSubscriptionTierSchema.validate(
            req.body
        );
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, price } = value;

        const newTier = await SubscriptionTier.create({ name, price });

        res.status(201).json({
            message: "Subscription tier created successfully",
            tier: {
                id: newTier.id,
                name: newTier.name,
                price: newTier.price,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createOneTier
}