const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, test } = require("../../config");
const { getAllRoles, getAllTiers } = require("../../service/admin");
const jwt = require("jsonwebtoken");
const { decodeToken } = require("../../service/token")

const getAdminRole = async (req, res) => {
    const user = req.user;
    // console.log(user)

    const allRole = await getAllRoles();

    return res.status(200).send(allRole)
}

const getAdminTier = async (req, res) => {
    const user = req.user;

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