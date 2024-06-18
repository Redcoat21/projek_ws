const {
    validateLoginSchema,
    validateRegisterSchema,
} = require("../../validation/api/auth");
const { getUser } = require("../../service/user");
const { findProduct, findAllProducts } = require("../../service/product");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../service/token");
const Joi = require("joi");

const getAllProduct = async (req, res) => {
    if(req.user.role !== "ADM") {
        let output = await getSellerProduct(req.user.username)
        return res.status(200).json({ "Products List": output })
    }
        let output = await findAllProducts();

        return res.status(200).json({ "Products List": output });
};

const getProducts = async (req, res) => {
    if(req.user.role !== "ADM") {
        return res.status(403).json({ message: "Forbidden" });
    }
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ Error: "ID needed!" });
    }

    return res.status(200).json({ "Products List": output });
};

module.exports = {
    getAllProduct,
    getProducts,
};
