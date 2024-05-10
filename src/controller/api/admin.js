const {
  validateLoginSchema,
  validateRegisterSchema,
} = require("../../validation/api/auth");
const { getUser } = require("../../service/user");
const { findProduct, findallproduct } = require("../../service/product");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../service/token");

const getProduct = async (req, res) => {
  res.clearCookie("accessToken");
  try {
    jwt.verify(req.cookies.accessToken, ACCESS_SECRET_KEY);
  } catch (error) {
    console.error(error);
  }

  try {
    const { username, password } = validateLoginSchema.validate(req.body).value;

    let findUser = await getUser(username);

    if (findUser) {
      if (!bcrypt.compareSync(password, findUser.password)) {
        return res.status(400).json({ Message: "Wrong Password Check again" });
      } else {
        if (findUser.role.toLowerCase() == "adm") {
          const id = req.body.id;
          if (id) {
            let output = await findProduct(id);
            return res.status(200).json(output);
          } else {
            let outpout = await findallproduct();
            return res.status(200).json(outpout);
          }
        } else {
          return res
            .status(400)
            .json({ Message: "Only Admin can Check the product" });
        }
      }
    } else {
      return res.status(400).json({ Message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  getProduct,
};
