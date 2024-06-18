const { LocalStorage } = require("node-localstorage");
const { validateCartSchema, validateCheckoutSchema, createUserSchema } = require("../../validation/api/user");
const { getProduct } = require("../../service/product");
const { addTransaction, getLastTransaction, addTransactionDetail } = require("../../service/transaction");
const { getUser, getSubscription} = require("../../service/user");
const { RAJAONGKIR_BASE_URL, RAJAONGKIR_API_KEY} = require("../../config");
const localStorage = new LocalStorage("./scratch");
const cache = new LocalStorage("./cache");
const axios = require("axios");
const qs = require("qs");
const luxon = require("luxon");
const { dev: sequelize } = require("../../database");
const { User } = require("../../model");

const getCart = async (req, res) => {
    let cart = JSON.parse(localStorage.getItem(`${req.user.username} cart`));

    if(!cart || cart === null) {
        // If cart doesn't exist, then make one.
        localStorage.setItem(`${req.user.username} cart`, JSON.stringify([]));
        cart = JSON.parse(localStorage.getItem(`${req.user.username} cart`));
    }

    return res.status(200).json(cart.map(item => ({
        product: {
            id: item.product.id,
            name: item.product.name,
            price: `Rp. ${item.product.price.toLocaleString("id-ID")}`,
            weight: item.product.weight
        },
        amount: item.amount,
        subtotal: `Rp. ${(item.product.price * item.amount).toLocaleString("id-ID")}`
    })));
}

const addToCart = async (req, res) => {
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

const calculateDeliveryPrice = async (origin, destination, courierChoice, totalWeight) => {
    const provinces = JSON.parse(cache.getItem("provinces")) ?? (await axios.get(`${RAJAONGKIR_BASE_URL}/province`, {
        headers: {
            'key': RAJAONGKIR_API_KEY
        }
    })).data;

    cache.setItem("provinces", JSON.stringify(provinces));

    const [originStreetAddress, originPostalCode, originCity, originProvince, originCountry] = origin.split(",");
    const [destinationStreetAddress, destinationPostalCode, destinationCity, destinationProvince, destinationCountry] = destination.split(",");

    const originProvinceId = provinces.rajaongkir.results.find(province =>  province.province === originProvince.trimStart().trimEnd()).province_id;
    const destinationProvinceId = provinces.rajaongkir.results.find(province => province.province === destinationProvince.trimStart().trimEnd()).province_id;

    const cachedCities = JSON.parse(cache.getItem("cities"));
    let cities;

    if(!cachedCities) {
        cities = (await axios.get(`${RAJAONGKIR_BASE_URL}/city`, {
            headers: {
                'key': RAJAONGKIR_API_KEY
            },
        })).data;
    } else {
        cities = cachedCities
    }

    cache.setItem("cities", JSON.stringify(cities));

    // Horrendous code! 😭
    const originCityId = cities.rajaongkir.results.filter(province => Number(province.province_id) === Number(originProvinceId)).find(city => city.city_name === originCity.trimStart().trimEnd()).city_id;
    const destinationCityId = cities.rajaongkir.results.filter(province => Number(province.province_id) === Number(destinationProvinceId)).find(city => city.city_name === destinationCity.trimStart().trimEnd()).city_id;

    return (await axios.post(`${RAJAONGKIR_BASE_URL}/cost`, qs.stringify({
        origin: originCityId,
        destination: destinationCityId,
        weight: totalWeight,
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
    const subscription = await getSubscription(buyer.username);
    let discountRate;

    // If the user is subscribed, they will gain discount.
    if(!subscription) {
        discountRate = 0;
    } else {
        switch(subscription.tier) {
            case 1:
                discountRate = 0.1;
                break;
            case 2:
                discountRate = 0.25;
                break;
            case 3:
                discountRate = 0.5;
                break;
        }
    }

    const cart = JSON.parse(localStorage.getItem(`${buyer.username} cart`));

    if(!cart || cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    const groupedCart = groupCartBySeller(cart);

    const t = await sequelize.transaction();

    let totalPrice = 0;
    try {
        for (const groupedItem of groupedCart) {
            // Because the cart is grouped based on the seller, we only need to query the seller once, and not for each group item.
            const seller = await getUser(groupedItem[0].product.seller);
            const totalWeight = groupedItem.reduce((total, current) => total += (current.product.weight * current.amount), 0);
            console.log(totalWeight);
            const deliveryData = (await calculateDeliveryPrice(buyer.address, 'Jl Mangga Besar 11/8, 11170, Jakarta Barat, DKI Jakarta, Indonesia', courierChoice, totalWeight)).data.rajaongkir;
            const chosenService = deliveryData.results[0].costs.find(cost => cost.service === serviceChoice);
            const deliveryPrice = chosenService.cost[0].value - (chosenService.cost[0].value * discountRate);

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

                totalPrice += productData.price * product.amount;
            }
            totalPrice += deliveryPrice;
        }

        if(buyer.balance < totalPrice) {
            await t.rollback();
            return res.status(402).json({ message: "Insufficient Balance", totalPrice: `Rp. ${(totalPrice.toLocaleString("id-ID"))}` });
        }

        buyer.balance -= totalPrice;
        buyer.update();

        await t.commit();
        localStorage.removeItem(`${buyer.username} cart`);
        return res.status(200).json({ message: "Checked out succesfully", totalPrice: `Rp. ${(totalPrice.toLocaleString("id-ID"))}` });
    } catch(error) {
        await t.rollback();
        console.error(error);
        return res.status(500).json({ message: "Checkout failed, please contact admin" });
    }
}

const getManyUser = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["username", "name", "email"], // Hanya pilih kolom tertentu
            where: {
                role: "USR",
            },
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getOneUser = async (req, res) => {
    if(req.user.role !== "ADM") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {

        const user = await User.findOne({
            attributes: ["username", "name", "email"], // Hanya pilih kolom tertentu
            where: {
                username: req.params.id,
            },
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createOneUser = async (req, res) => {
    try {
        const { error, value } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { username, name, email, password, phone_number } = value;

        const newUser = await User.create({
            username,
            name,
            email,
            password, // Password disimpan tanpa hashing
            phone_number,
            role: "USR", // Asumsikan 'USR' adalah id untuk role 'user'
            balance: 0,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                username: newUser.username,
                name: newUser.name,
                email: newUser.email,
                balance: newUser.balance,
                created_at: newUser.created_at,
            },
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res
                .status(409)
                .json({ error: "Username or email already exists" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteOneUser = async (req, res) => {
    if(req.user.role !== "ADM") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const username = req.params.id; // menggunakan username sebagai id

    try {
        // Cari user
        const user = await User.findByPk(username);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Hapus semua produk yang terkait dengan pengguna
        await Product.destroy({
            where: { seller: username },
            force: true, // Ini akan menghapus secara permanen, bukan soft delete
        });

        // Hapus pengguna
        await user.destroy();

        res.status(200).json({
            message: "User and related products deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = {
    getCart,
    addToCart,
    checkout,
    getManyUser,
    getOneUser,
    createOneUser,
    deleteOneUser
}