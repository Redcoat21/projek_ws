const { Product } = require("../model");
const { randomUUID } = require('crypto');

const getProduct = async (id) => {
    return await Product.findByPk(id);
}

const addProduct = async (productData, transaction = undefined) => {
    const { name, description, seller, price } = productData;
    const id = randomUUID();

    await Product.create({
        id: id,
        name: name,
        description: description,
        seller: seller,
        price: price,
    }, {
        transaction: transaction
    });

}

module.exports = {
    getProduct,
    addProduct
}