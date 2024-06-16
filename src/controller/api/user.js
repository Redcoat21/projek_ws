const { LocalStorage } = require("node-localstorage");
const { validateCartSchema, validateCheckoutSchema} = require("../../validation/api/user");
const { getProduct } = require("../../service/product");
const { addTransaction, getLastTransaction, addTransactionDetail } = require("../../service/transaction");
const { getUser } = require("../../service/user");
const { RAJAONGKIR_BASE_URL, RAJAONGKIR_API_KEY} = require("../../config");
const localStorage = new LocalStorage("./scratch");
const axios = require("axios");
const qs = require("qs");
const luxon = require("luxon");
const { dev: sequelize } = require("../../database");

const getCart = async (req, res) => {
    let cart = JSON.parse(localStorage.getItem(`${req.user.username} cart`));
    if(!cart) {
        // If cart doesn't exist, then make one.
        cart = localStorage.setItem(`${req.user.username} cart`, JSON.stringify([]));
    }
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
    const temp = [];
    if(oldCart) {
        obj.push(...oldCart)
    }
    for(const result of results) {
        const oldCartItem = obj.find(item => item.product.id === result.id);

        if(oldCartItem) {
            oldCartItem.amount += result.amount;
        } else {
            const product = await getProduct(result.id);
            if(!product) {
                return res.status(400).json({ message: `Invalid product id ${result.id}`});
            }
            obj.push({
                product: product,
                amount: result.amount
            })
        }
    }

    localStorage.setItem(`${req.user.username} cart`, JSON.stringify(obj));

    return res.status(200).json({ message: `Succesfully added ${results.reduce((sum, item) => sum + item.amount, 0)} ${results.length > 1 ? "items" : "item"} to cart` });
}

const groupCartBySeller = (cart) => {
    const indexMap = {};
    const result = [];

    cart.forEach(item => {
        const seller = item.product.seller;
        if(indexMap[seller] === undefined) {
            indexMap[seller] = result.length;
            result.push([]);
        }
        result[indexMap[seller]].push(item);
    })

    return result;
}

const calculateDeliveryPrice = async (origin, destination, courierChoice) => {
    //TODO Find a way to cache provinces and city data.
    const provinces = (await axios.get(`${RAJAONGKIR_BASE_URL}/province`, {
        headers: {
            'key': RAJAONGKIR_API_KEY
        }
    })).data;
    const [originStreetAddress, originPostalCode, originCity, originProvince, originCountry] = origin.split(",");
    const [destinationStreetAddress, destinationPostalCode, destinationCity, destinationProvince, destinationCountry] = destination.split(",");

    const originProvinceId = provinces.rajaongkir.results.find(province =>  province.province === originProvince.trimStart().trimEnd()).province_id;
    const destinationProvinceId = provinces.rajaongkir.results.find(province => province.province === destinationProvince.trimStart().trimEnd()).province_id;

    const cities = (await axios.get(`${RAJAONGKIR_BASE_URL}/city`, {
        headers: {
            'key': RAJAONGKIR_API_KEY
        },
    })).data;

    // Horrendous code! 😭
    const originCityId = cities.rajaongkir.results.filter(province => Number(province.province_id) === Number(originProvinceId)).find(city => city.city_name === originCity.trimStart().trimEnd()).city_id;
    const destinationCityId = cities.rajaongkir.results.filter(province => Number(province.province_id) === Number(destinationProvinceId)).find(city => city.city_name === destinationCity.trimStart().trimEnd()).city_id;

    return (await axios.post(`${RAJAONGKIR_BASE_URL}/cost`, qs.stringify({
        origin: originCityId,
        destination: destinationCityId,
        weight: 10,
        courier: courierChoice
    }), {
        headers: {
            'key': RAJAONGKIR_API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }));
}

const checkout = async (req, res) => {
    const { value, error } = validateCheckoutSchema.validate(req.body);
    if(error) {
        console.error(error);
        return res.status(400).json({message: error.message});
    }
    const { courier_choice: courierChoice, service_choice: serviceChoice } = value;

    const buyer = await getUser(req.user.username);
    const cart = JSON.parse(localStorage.getItem(`${buyer.username} cart`));

    if(!cart || cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    const groupedCart = groupCartBySeller(cart);

    const t = await sequelize.transaction();

    try {
        for (const groupedItem of groupedCart) {
            // Because the cart is grouped based on the seller, we only need to query the seller once, and not for each group item.
            const seller = await getUser(groupedItem[0].product.seller);
            const deliveryData = (await calculateDeliveryPrice(buyer.address, 'Jl Mangga Besar 11/8, 11170, Jakarta Barat, DKI Jakarta, Indonesia', courierChoice)).data.rajaongkir;
            const chosenService = deliveryData.results[0].costs.find(cost => cost.service === serviceChoice);
            const deliveryPrice = chosenService.cost[0].value;

            const lastTransaction = await addTransaction({
                buyer: buyer.username,
                destination: buyer.address,
                deliveryPrice: deliveryPrice
            }, t)

            const etd = chosenService.cost[0].etd;

            // TIKI's etd or JNE's etd.
            const estimatedTime = etd.length === 1 ? etd : chosenService.cost[0].etd.split("-")[1];

            for (const product of groupedItem) {
                const productData = product.product;

                await addTransactionDetail({
                    transaction: lastTransaction.id,
                    product: productData.id,
                    quantity: product.amount,
                    subtotal: productData.price * product.amount,
                    deliveryDate: luxon.DateTime.now().plus(Number(estimatedTime))
                }, t)
            }
        }
        await t.commit();
        localStorage.removeItem(`${buyer.username} cart`);
        return res.status(200).json({ message: "Checked out succesfully" });
    } catch(error) {
        await t.rollback();
        return res.status(500).json({ message: "Checkout failed, please contact admin" });
    }
}

module.exports = {
    getCart,
    addToCart,
    checkout
}