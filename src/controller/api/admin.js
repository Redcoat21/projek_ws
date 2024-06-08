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
    let { username, password } = req.body;

    if (username && password) {
        let findUser = await getUser(username);

        if (!findUser) {
            return res.status(400).json({ Message: "User not found!" });
        }

        if (!bcrypt.compareSync(password, findUser.password)) {
            return res
                .status(400)
                .json({ Message: "Wrong Password Check again!" });
        }

        let output = await findAllProducts();

        if (findUser.role == "adm") {
            return res.status(200).json({ "Products List": output });
        } else {
            return res
                .status(403)
                .json({ "Foridden Access": "Only Admin can Access" });
        }
    } else {
        return res
            .status(400)
            .json({ Error: "Username or Password if empty!" });
    }
};

const getProducts = async (req, res) => {
    let { username, password, id } = req.body;

    if (username && password) {
        let findUser = await getUser(username);

        if (!findUser) {
            return res.status(400).json({ Message: "User not found!" });
        }

        if (!bcrypt.compareSync(password, findUser.password)) {
            return res
                .status(400)
                .json({ Message: "Wrong Password Check again!" });
        }

        if (!id) {
            return res.status(400).json({ Error: "ID needed!" });
        }

        if (parseInt(id)) {
            if (findUser.role == "adm") {
                let output = await findProduct(id);
                return res.status(200).json({ "Products List": output });
            } else {
                return res
                    .status(403)
                    .json({ "Foridden Access": "Only Admin can Access" });
            }
        } else {
            return res.status(403).json({ Error: "Id Invalid!" });
        }
    } else {
        return res
            .status(400)
            .json({ Error: "Username or Password if empty!" });
    }
};

module.exports = {
    getAllProduct,
    getProducts,
};
