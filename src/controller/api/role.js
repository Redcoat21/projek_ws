const { Role } = require("../../model");
const { createRoleSchema } = require("../../validation/api/role");

const createOneRole = async (req, res) => {
    try {
        const { error, value } = createRoleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id, name } = value;

        const [role, created] = await Role.findOrCreate({
            where: { id },
            defaults: { name },
        });

        if (!created) {
            return res
                .status(409)
                .json({ error: "Role with this ID already exists" });
        }

        res.status(201).json({
            message: "Role created successfully",
            role: {
                id: role.id,
                name: role.name,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createOneRole
}
