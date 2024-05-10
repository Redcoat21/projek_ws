const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const { getAllRoles, getAllTiers } = require("../../service/admin");
const jwt = require("jsonwebtoken");
const { decodeToken } = require("../../service/token")

const getAdminRole = async (req, res) => {
    const user = await decodeToken(req.cookies.accessToken);
    
    if(!user){
        return res.sendStatus(401);
    }

    if(user.role != "ADM"){
        return res.sendStatus(403);
    }

    const allRole = await getAllRoles();

    return res.status(200).send(allRole)
}

const getAdminTier = async (req, res) => {
    const user = await decodeToken(req.cookies.accessToken);
    if(!user){
        return res.sendStatus(401);
    }

    if(user.role != "ADM"){
        return res.sendStatus(403);
    }

    const allTier = await getAllTiers();

    return res.status(200).send(allTier)
}

module.exports = {
    getAdminRole,
    getAdminTier,
}