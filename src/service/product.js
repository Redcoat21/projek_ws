const { where } = require("sequelize")
const { Product } = require("../model")

const findProduct = async (id) => {
  const product = await Product.findByPk(id)

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    seller: product.seller,
  }
}

const findAllProducts = async () => {
  const products = await Product.findAll()
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      seller: product.seller,
    }
  })
}

const getSellerProduct = async (username) => {
  const products = await Product.findAll({
    where: {
      seller: username,
    },
  })
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      seller: product.seller,
    }
  })
}

const removeproduct = async (id, username) => {
  let remove = await Product.findOne({
    where: {
      id: id,
      seller: username,
    },
  })

  return remove
}

const updateProduct = async (id, username, name, description, price) => {
  let update = await Product.update(
    {
      name: name,
      description: description,
      price: price,
    },
    {
      where: {
        id: id,
        seller: username,
      },
    }
  )

  return update
}

const deleteproduct = async (id, username) => {
  let remove = await Product.destroy({ where: { id: id, seller: username } })

  return remove
}

const checkvalid = async (id, username) => {
  let valid = await Product.findOne({
    where: {
      id: id,
      seller: username,
    },
  })

  return valid
}

const createProduct = async (id, name, description, price, seller) => {
  let addprod = await Product.create({
    id: id,
    name: name,
    description: description,
    price: price,
    seller: seller,
    created_at: Date.now(),
  })
}

const checkdouble = async (username, name) => {
  let valid = await Product.findOne({
    where: {
      seller: username,
      name: name,
    },
  })

  return valid
}

const randomISBN = () => {
  const randomDigits = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  )
  const isbnParts = ["978", ...randomDigits.slice(0, 3)]

  const hyphenPositions = []
  for (let i = 0; i < Math.floor(Math.random() * 2) + 3; i++) {
    const position = Math.floor(Math.random() * (isbnParts.length - 1)) + 1
    if (!hyphenPositions.includes(position)) {
      hyphenPositions.push(position)
    }
  }

  hyphenPositions.sort((a, b) => a - b)
  hyphenPositions.forEach((position, index) => {
    isbnParts.splice(position + index, 0, "-")
  })

  const lastDigit = Math.floor(Math.random() * 10)
  isbnParts.push(lastDigit)

  while (isbnParts.join("").length < 13) {
    isbnParts.splice(
      Math.floor(Math.random() * (isbnParts.length - 1)) + 1,
      0,
      Math.floor(Math.random() * 10)
    )
  }

  return isbnParts.join("")
}

module.exports = {
  findProduct,
  findAllProducts,
  getSellerProduct,
  removeproduct,
  checkvalid,
  randomISBN,
  createProduct,
  checkdouble,
  deleteproduct,
  updateProduct,
}
