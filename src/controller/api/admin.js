const {
    validateLoginSchema,
    validateRegisterSchema,
} = require("../../validation/api/auth");
const { getUser } = require("../../service/user");
const { findProduct, findAllProducts, getSellerProduct } = require("../../service/product");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../service/token");
const Joi = require("joi");
const { Product } = require("../../model");

const getAllProduct = async (req, res) => {
    if(req.user.role !== "SLR") {
        let output = await getSellerProduct(req.user.username)
        return res.status(200).json({ "Products List": output })
    }
        let output = await findAllProducts();

        return res.status(200).json({ "Products List": output });
};

const getProducts = async (req, res) => {
    const id = req.params.id;
    if(req.user.role !== "ADM") {
        const result = await Product.findByPk(id);
        if(result.seller !== req.user.username) {
            return res.status(403).json({ message: "Item doesnt belong to this seller"});
        }
        return res.status(200).json({ "Products List": result})
    }
    console.log(id);

    if (!id) {
        return res.status(400).json({ Error: "ID needed!" });
    }

    const output = await findProduct(id);

    return res.status(200).json({ "Products List": output });
};

module.exports = {
    getAllProduct,
    getProducts,
};
