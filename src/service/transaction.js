const { Transaction, TransactionDetail } = require("../model");
const { randomUUID } = require("crypto");
const addTransaction = async (transactionData) => {
    const { destination, buyer, deliveryPrice } = transactionData;

    const id = randomUUID();

    return (await Transaction.create({
        id: id,
        buyer: buyer,
        deliveryPrice: deliveryPrice,
        destination: destination
    }));
}

const getTransaction = async (id) => {
    return await Transaction.findByPk(id);
}

const getLastTransaction = async () => {
    return await Transaction.findOne({
        order: [['createdAt', 'DESC']]
    });
}

const addTransactionDetail = async (transactionDetailData) => {
    const id = randomUUID();
    const { transaction, product, quantity, subtotal, deliveryDate } = transactionDetailData;

    await TransactionDetail.create({
        id,
        transaction,
        product,
        quantity,
        subtotal,
        deliveryDate,
    })
}

module.exports = {
    addTransaction,
    addTransactionDetail,
    getTransaction,
    getLastTransaction
}