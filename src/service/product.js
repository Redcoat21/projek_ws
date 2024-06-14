const { Product } = require("../model");

const getProduct = async (id) => {
    return Product.findByPk(id);
}

module.exports = {
    getProduct
}