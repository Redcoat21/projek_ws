const { Role } = require('../model');

const getAllRole = async () => {
    return await Role.findAll();
}