const {
  validateLoginSchema,
  validateRegisterSchema,
} = require("../../validation/api/auth")
const {
  getSellerProduct,
  removeproduct,
  checkvalid,
  randomISBN,
  createProduct,
  checkdouble,
  deleteproduct,
  updateProduct,
} = require("../../service/product")
const { getUser } = require("../../service/user")
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { createToken } = require("../../service/token")
const faker = require("@faker-js/faker")
const { valid } = require("joi")

const sellerProducts = async (req, res) => {
  let { username, password, id } = req.body

  if (username && password) {
    let findUser = await getUser(username)

    if (!findUser) {
      return res.status(400).json({ Message: "User not found!" })
    }

    if (!bcrypt.compareSync(password, findUser.password)) {
      return res.status(400).json({ Message: "Wrong Password Check again!" })
    }

    if (findUser.role == "slr") {
      let output = await getSellerProduct(username)
      return res.status(200).json({ "Products List": output })
    } else {
      return res
        .status(403)
        .json({ "Foridden Access": "Only Seller can Access" })
    }
  } else {
    return res.status(400).json({ Error: "Username or Password if empty!" })
  }
}

const AddsellerProduct = async (req, res) => {
  let { username, password, name, description, price } = req.body
  let id = randomISBN()

  if (username && password) {
    let findUser = await getUser(username)

    if (!findUser) {
      return res.status(400).json({ Message: "User not found!" })
    }

    if (!bcrypt.compareSync(password, findUser.password)) {
      return res.status(400).json({ Message: "Wrong Password Check again!" })
    }

    if (!id) {
      return res.status(400).json({ Error: "ID needed!" })
    }

    if (name && description && price) {
      let check = await checkdouble(username, name)

      if (findUser.role == "slr") {
        if (check) {
          return res
            .status(400)
            .json({ Error: `This seller already have ${name} in their shop` })
        }

        let create = await createProduct(
          id,
          name,
          description,
          price,
          findUser.username
        )

        return res.status(201).json({ SuccessCreate: "Product add success!" })
      } else {
        return res
          .status(403)
          .json({ "Foridden Access": "Only Seller can Access" })
      }
    } else {
      return res.status(400).json({ Error: "Some field is empty" })
    }
  } else {
    return res.status(400).json({ Error: "Username or Password if empty!" })
  }
}

const deletetsellerproduct = async (req, res) => {
  let { username, password, id } = req.body

  if (username && password) {
    let findUser = await getUser(username)

    if (!findUser) {
      return res.status(400).json({ Message: "User not found!" })
    }

    if (!bcrypt.compareSync(password, findUser.password)) {
      return res.status(400).json({ Message: "Wrong Password Check again!" })
    }

    if (!id) {
      return res.status(400).json({ Error: "Id Needed" })
    }

    if (findUser.role == "slr") {
      let valid = await checkvalid(id, username)
      if (valid) {
        let destroy = await deleteproduct(id, username)
        return res.status(200).json({ Message: "Success Delete" })
      } else {
        return res
          .status(403)
          .json({ Forbidden: `This is not ${username} product` })
      }
    } else {
      return res
        .status(403)
        .json({ "Foridden Access": "Only Seller can Access" })
    }
  } else {
    return res.status(400).json({ Error: "Username or Password if empty!" })
  }
}

const updateSellerProduct = async (req, res) => {
  let { username, password, id, name, price, description } = req.body
  let find = await getSellerProduct(username)
  let tempname, tempdesc, tempprice

  if (name) {
    tempname = name
  } else {
    tempname = find.name
  }

  if (price) {
    tempprice = price
  } else {
    tempprice = find.price
  }

  if (description) {
    tempdesc = description
  } else {
    tempdesc = find.description
  }

  if (username && password) {
    let findUser = await getUser(username)

    if (!findUser) {
      return res.status(400).json({ Message: "User not found!" })
    }

    if (!bcrypt.compareSync(password, findUser.password)) {
      return res.status(400).json({ Message: "Wrong Password Check again!" })
    }

    if (!id) {
      return res.status(400).json({ Error: "Id Needed" })
    }

    if (findUser.role == "slr") {
      let valid = await checkvalid(id, username)
      if (valid) {
        let destroy = await updateProduct(
          id,
          username,
          tempname,
          tempdesc,
          tempprice
        )
        return res.status(200).json({ Message: "Success Update" })
      } else {
        return res
          .status(403)
          .json({ Forbidden: `This is not ${username} product` })
      }
    } else {
      return res
        .status(403)
        .json({ "Foridden Access": "Only Seller can Access" })
    }
  } else {
    return res.status(400).json({ Error: "Username or Password if empty!" })
  }
}

module.exports = {
  sellerProducts,
  deletetsellerproduct,
  AddsellerProduct,
  updateSellerProduct,
}
