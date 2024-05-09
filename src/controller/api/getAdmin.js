const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const { getAllRole } = require("../../service/admin")

const getAdminRole = async (req, res) => {
    return res.status(200).send(req.cookies)
}