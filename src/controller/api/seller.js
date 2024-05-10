const {
  validateLoginSchema,
  validateRegisterSchema,
} = require("../../validation/api/auth");
const {
  findSellerproduct,
  removeproduct,
  checkvalid,
} = require("../../service/product");
const { getUser } = require("../../service/user");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../service/token");

const sellerProducts = async (req, res) => {
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
      let findthissellerproduct = await findSellerproduct(username);
      return res.status(200).json(findthissellerproduct);
      //   if (!bcrypt.compareSync(password, findUser.password)) {
      //     return res.status(400).json({ Message: "Wrong Password Check again" });
      //   } else {
      //     if (findUser.role.toLowerCase() == "slr") {

      //     } else {
      //       return res
      //         .status(400)
      //         .json({ Message: "Only Seller can Check their own product" });
      //     }
      //   }
    } else {
      return res.status(400).json({ Message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

const deletetsellerproduct = async (req, res) => {
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
      let id = req.body.id;
      let valid = "test";

      if (valid) {
        let removesellerproduct = await removeproduct(id);
        return res.status(200).json({
          Message: `${username} success remove their ${valid.name} product`,
        });
      } else {
        return res
          .status(403)
          .json({ Message: "This product is not this seller's product" });
      }

      //   if (!bcrypt.compareSync(password, findUser.password)) {
      //     return res.status(400).json({ Message: "Wrong Password Check again" });
      //   } else {
      //     if (findUser.role.toLowerCase() == "slr") {

      //     } else {
      //       return res
      //         .status(400)
      //         .json({ Message: "Only Seller can Check their own product" });
      //     }
      //   }
    } else {
      return res.status(400).json({ Message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  sellerProducts,
  deletetsellerproduct,
};
