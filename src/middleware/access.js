const checkPermission = async (req, res, next) => {
    const user = req.user
    const userID = req.params.id

    if(user.role !== "ADM"){
        if(user.username != userID){
            return res.status(403).json({ message: "Forbidden" });
        }
    }

    next();
}

module.exports = {
    checkPermission,
}