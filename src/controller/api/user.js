const { User } = require("../../model");
const { LocalStorage } = require("node-localstorage");
const { validateCartSchema } = require("../../validation/api/user");
const {getProduct} = require("../../service/product");

const localStorage = new LocalStorage("./scratch");
const getCart = async (req, res) => {
    const cart = JSON.parse(localStorage.getItem(`${req.user.username} cart`));
    return res.status(200).json(cart.map(item => ({
        product: {
            id: item.product.id,
            name: item.product.name,
            price: `Rp. ${item.product.price.toLocaleString("id-ID")}`
        },
        amount: item.amount,
        subtotal: `Rp. ${(item.product.price * item.amount).toLocaleString("id-ID")}`
    })));
}

const addToCart = async (req, res) => {
    // localStorage.clear();
    const { error, value: validationResult } = validateCartSchema.validate(req.body);
    const results = Array.isArray(validationResult) ? validationResult : [validationResult];

    if(error) {
        return res.status(400).json({message: error.message})
    }

    // Should be an array
    const oldCart = JSON.parse(localStorage.getItem(`${req.user.username} cart`));
    const obj = [];
    if(oldCart) {
        obj.push(...oldCart)
    }
    for(const result of results) {
        const oldCartItem = obj.find(item => item.product.id === result.id);

        if(oldCartItem) {
            oldCartItem.amount += result.amount;
        } else {
            const product = await getProduct(result.id);

            obj.push({
                product: product,
                amount: result.amount
            })
        }
    }

    localStorage.setItem(`${req.user.username} cart`, JSON.stringify(obj));

    return res.status(200).json({ message: `Succesfully added ${results.reduce((sum, item) => sum + item.amount, 0)} ${results.length > 1 ? "items" : "item"} to cart` });
}

module.exports = {
    getCart,
    addToCart
}