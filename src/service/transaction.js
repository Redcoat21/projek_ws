const { Transaction, TransactionDetail, User, Product } = require("../model");
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

const getOneTrans = async (transID) => {
    const transaction = await Transaction.findByPk(transID);
    if(!transaction){
        throw new Error("Transaction Not Found!");
    }

    const trans = transaction.dataValues;

    return trans
}

const getOneTransUser = async (trans) => {
    let transDetail = await TransactionDetail.findAll({where: {transaction: trans}})
    transDetail = transDetail.map((item) => item.dataValues)
    transDetail = await Promise.all(transDetail.map( async (item) => {
        let barang = await Product.findByPk(item.product)
        barang = barang.dataValues

        let nama = await User.findByPk(barang.seller)
        nama = nama.dataValues

        barang.seller = nama.name
        barang = {
            id: barang.id,
            name: barang.name,
            seller: barang.seller,
            price: barang.price,
            description: barang.description
        }

        return {
            id: item.id,
            product: barang,
            quantity: item.quantity,
            subtotal: item.subtotal
        }
    }));

    return transDetail
}

const getOneTransSeller = async (trans, seller) => {
    let transDetail = await TransactionDetail.findAll({where: {transaction: trans}})
    transDetail = transDetail.map((item) => item.dataValues)
    transDetail = await Promise.all(transDetail.map( async (item) => {
        let barang = await Product.findByPk(item.product)
        barang = barang.dataValues

        barang = {
            id: barang.id,
            name: barang.name,
            seller: barang.seller,
            price: barang.price,
            description: barang.description
        }

        return {
            id: item.id,
            product: barang,
            quantity: item.quantity,
            subtotal: item.subtotal
        }
    }));

    let hasil = []

    for (const d of transDetail) {
        if(d.product.seller == seller){
            hasil.push(d)
        }
    }

    for (const d of hasil) {
        d.product = {
            id: d.product.id,
            name: d.product.name,
            price: d.product.price,
            description: d.product.description
        }
    }

    return hasil
}

const getTotal = (transDetail, deliveryCost) => {
    let harga = transDetail.map((item) => item.subtotal)

    let total = 0

    for (const har of harga) {
        total += parseInt(har)
    }
    total += parseInt(deliveryCost)

    return total
}

const getProfit = (transDetail) => {
    let harga = transDetail.map((item) => item.subtotal)

    let total = 0

    for (const har of harga) {
        total += parseInt(har)
    }

    return total
}

const getAllTransUser = async (user) => {
    let trans = await Transaction.findAll({where: {buyer: user.username}})
    if(trans.length == 0){
        return trans
    }

    trans = trans.map((item) => item.dataValues)
    trans = trans.map((item) => {
        return {
            id: item.id,
            origin: item.origin,
            destination: item.destination,
            deliveryPrice: item.deliveryPrice,
            arrivalDate: item.arrivalDate
        }
    })

    for (const t of trans) {
        let dtrans = await getOneTransUser(t.id)
        let total = getTotal(dtrans, t.deliveryPrice)

        // t.detail = dtrans
        t.total = total

        t.arrivalDate = t.arrivalDate.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    }

    return trans
}

const getAllTransSeller = async (user) => {
    let dtrans = await TransactionDetail.findAll({
        include: {
            model: Product,
            where: { seller: user.username },
            // include: {
            //     model: User,
            //     attributes: ['id', 'name'],
            // }
        }
    });
    dtrans = dtrans.map((item) => item.dataValues)
    console.log(dtrans)

    list_trans = dtrans.map((item) => item.transaction)

    dtrans = await Promise.all(dtrans.map( async (item) => {
        let transnya = await Transaction.findByPk(item.transaction, {
            include: [{
                model: User,
                foreignKey: 'buyer',
                attributes: ['name'],
            }],
        })

        return {
            id: item.id,
            transaction_id: item.transaction,
            product: {
                id: item.Product.id,
                name: item.Product.name,
                price: item.Product.price
            },
            quantity: item.quantity,
            subtotal: item.subtotal,
            buyer: transnya.User.name,
        }
    }))

    return dtrans
}

const getAllProfit = (dtrans) => {
    let harga = dtrans.map((item) => item.subtotal)

    let total = 0

    for (const har of harga) {
        total += parseInt(har)
    }

    total = "Rp. " + total.toLocaleString("ID-id")

    return total
}

const getAllTotal = (trans) => {
    let harga = trans.map((item) => {
        return {
            kirim: item.deliveryPrice,
            total: item.total
        }
    })

    let total = 0
    for (const hrg of harga) {
        total += parseInt(hrg.kirim)
        total += parseInt(hrg.total)
    }

    total = "Rp. " + total.toLocaleString("ID-id")

    return total
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
    getLastTransaction,
    getOneTrans,
    getOneTransUser,
    getOneTransSeller,
    getTotal,
    getProfit,
    getAllTransUser,
    getAllTransSeller,
    getAllProfit,
    getAllTotal
}
