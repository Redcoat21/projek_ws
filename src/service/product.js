const { Product } = require("../model");
const { randomUUID } = require('crypto');
const { where } = require("sequelize");

const getProduct = async (id) => {
    return await Product.findByPk(id);
}

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

const addProduct = async (productData, transaction = undefined) => {
    const { name, description, seller, price, weight } = productData;
    const id = randomUUID();

    await Product.create({
        id: id,
        name: name,
        description: description,
        seller: seller,
        price: price,
        weight: weight
    }, {
        transaction: transaction
    });
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

const createProduct = async (name, description, price, seller, weight) => {
    await addProduct({
        name: name,
        description: description,
        seller: seller,
        price: price,
        weight: weight
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

module.exports = {
    getProduct,
    addProduct,
    findProduct,
    findAllProducts,
    getSellerProduct,
    removeproduct,
    checkvalid,
    createProduct,
    checkdouble,
    deleteproduct,
    updateProduct,
}