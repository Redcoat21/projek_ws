const { updateData } = require("../../../controller/api/updateUser");
const { checkPermission } = require("../../../middleware/access");
const { checkAccessToken } = require("../../../middleware/token");
const { uploadSingle } = require("../../../multer/uploadPP");

module.exports = (expressApp) => ({
    middleware: [
        checkAccessToken, 
        checkPermission, 
        uploadSingle.single('profile_picture')
        ],
    put: updateData
});