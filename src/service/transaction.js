const { Transaction, TransactionDetail } = require("../model");
const { randomUUID } = require("crypto");
const addTransaction = async (transactionData, transaction = undefined) => {
    const { destination, buyer, deliveryPrice } = transactionData;

    const id = randomUUID();

    return (await Transaction.create({
        id: id,
        buyer: buyer,
        deliveryPrice: deliveryPrice,
        destination: destination
    }, {
        transaction: transaction
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

const addTransactionDetail = async (transactionDetailData, transactionT = undefined) => {
    const id = randomUUID();
    const { transaction, product, quantity, subtotal, deliveryDate } = transactionDetailData;

    await TransactionDetail.create({
        id,
        transaction,
        product,
        quantity,
        subtotal,
        deliveryDate,
    }, {
        transaction: transactionT
    })
}

module.exports = {
    addTransaction,
    addTransactionDetail,
    getTransaction,
    getLastTransaction
}