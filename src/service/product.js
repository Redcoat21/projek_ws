const { Product } = require("../model");
const { randomUUID } = require('crypto');

const getProduct = async (id) => {
    return await Product.findByPk(id);
}

const addProduct = async (productData) => {
    const { name, description, seller, price } = productData;
    const id = randomUUID();

    await Product.create({
        id: id,
        name: name,
        description: description,
        seller: seller,
        price: price,
        createdAt: luxon.DateTime.now()
    });

}

module.exports = {
    getProduct,
    addProduct
}