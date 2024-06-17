const { getAllRoles, getAllTiers } = require("../../service/admin");

const getAdminRole = async (req, res) => {
    const allRole = await getAllRoles();

    return res.status(200).send(allRole)
}

const getAdminTier = async (req, res) => {
    let allTier = await getAllTiers();
    allTier = allTier.map((item) => {
        return {
            name: item.name,
            price: item.price,
        }
    })

    return res.status(200).send(allTier)
}

module.exports = {
    getAdminRole,
    getAdminTier,
}