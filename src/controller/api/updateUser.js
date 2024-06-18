const { getUser, topupSaldo, updateDataService } = require("../../service/user")
const { validateUpdateData } = require("../../validation/api/data")


const updateSaldo = async (req, res) => {
    const userID = req.params.id
    const {saldo} = req.body
    const user = await getUser(userID)

    const newUser = await topupSaldo(user, saldo)
    return res.status(200).send({
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        balance: newUser.balance
    })
}

const updateData = async (req, res) => {
    const userID = req.params.id;
    const user = await getUser(userID);

    const { error, value } = validateUpdateData.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    const { email, phone_number: phone, name } = value;

    // console.log(email, phone, name);
    const newUser = await updateDataService(user, name, email, phone)

    let msg = ""

    if(req.file){
        msg = "Profile picture sudah diupdate"
    }
    else{
        msg = "Tidak ada update dalam profile picture"
    }

    return res.status(200).send({
        profilePicture: msg,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        balance: newUser.balance
    })
};

module.exports = {
    updateSaldo,
    updateData
}