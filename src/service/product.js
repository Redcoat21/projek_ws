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
  let findthisproduct = await Product.findAll({
    where: {
      seller: username,
    },
  })
  return findthisproduct
}

const removeproduct = async (id) => {
  let remove = await Product.findOne({
    where: {
      id: id,
    },
  })

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

module.exports = {
  findProduct,
  findAllProducts,
  getSellerProduct,
  removeproduct,
  checkvalid,
}
