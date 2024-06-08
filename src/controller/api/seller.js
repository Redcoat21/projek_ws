const {
    validateLoginSchema,
    validateRegisterSchema,
} = require("../../validation/api/auth");
const {
    getSellerProduct,
    removeproduct,
    checkvalid,
} = require("../../service/product");
const { getUser } = require("../../service/user");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../service/token");
const faker = require("@faker-js/faker");

const sellerProducts = async (req, res) => {
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
            if (findUser.role == "slr") {
                let output = await getSellerProduct(username);
                return res.status(200).json({ "Products List": output });
            } else {
                return res
                    .status(403)
                    .json({ "Foridden Access": "Only Seller can Access" });
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

const AddsellerProduct = async (req, res) => {
<<<<<<< HEAD
  // let {} = req.body

  // const id = faker.commerce.isbn({
  //   separator: "-",
  // })

  return res.status(200).json("e")
}
=======
    let {} = req.body;

    const id = faker.commerce.isbn({
        separator: "-",
    });

    return res.status(200).json(id);
};
>>>>>>> c6f27ed70d89b8803d7ae62017acd391a341d054

const deletetsellerproduct = async (req, res) => {};

module.exports = {
    sellerProducts,
    deletetsellerproduct,
    AddsellerProduct,
};
