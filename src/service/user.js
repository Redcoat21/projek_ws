const { User, Subscription } = require("../model");
const bcrypt = require("bcrypt");

const getUser = async (username) => {
    return await User.findByPk(username);
};

const createUser = async (data, transaction = undefined) => {
    const { username, name, email, password, phone, role, refreshToken, address } = data;
    const user = await getUser(username);

    if (user) {
        throw new Error("User already exists!");
    }

    try {
        return await User.create({
            username,
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            phoneNumber: phone,
            role,
            refreshToken,
            address
        }, {
            transaction: transaction
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

const getSubscription = async (subscriber) => {
    return (await Subscription.findOne({
        where: {
            subscriber: subscriber
        }
    }));
}

const topupSaldo = async (user, saldo) => {
    await User.update(
        {balance: parseInt(user.balance) + saldo},
        {
            where: {
                username: user.username
            }
        }
    )

    return await getUser(user.username)
}

const updateDataService = async (user, name, email, phoneNumber) => {
    if(name){
        await User.update(
            {name: name},
            {
                where:{
                    username: user.username
                }
            }
        )
    }

    if(email){
        await User.update(
            {email: email},
            {
                where: {
                    username: user.username
                }
            }
        )
    }

    if(phoneNumber){
        await User.update(
            {phoneNumber: phoneNumber},
            {
                where: {
                    username: user.username
                }
            }
        )
    }

    return await getUser(user.username)
}

module.exports = {
    getUser,
    createUser,
    topupSaldo,
    updateDataService,
    getSubscription
};
