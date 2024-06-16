const { getOneTrans, getOneTransUser, getTotal, getOneTransSeller, getProfit, getAllTransUser, getAllTransSeller, getAllProfit, getAllTotal } = require("../../service/transaction")

const getOneTransaction = async (req, res) => {
    const user = req.user
    const transID = req.params.id
    let trans = null

    try{
        trans = await getOneTrans(transID);
    }
    catch (error){
        console.log(error)
        return res.status(400).send({message: error.message})
    }

    if(user.role == "USR"){
        if(trans.buyer != user.username){
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        let dtrans = await getOneTransUser(trans.id)

        let total = getTotal(dtrans, trans.deliveryPrice)

        trans.deliveryPrice = "Rp. " + parseInt(trans.deliveryPrice).toLocaleString("ID-id")
        for (const d of dtrans) {
            d.product.price = "Rp. " + parseInt(d.product.price).toLocaleString("ID-id")
            d.subtotal = "Rp. " + parseInt(d.subtotal).toLocaleString("ID-id")
        }
        total = "Rp. " + parseInt(total).toLocaleString("ID-id")

        trans.detail = dtrans
        trans.total = total

        // trans.arrivalDate = trans.arrivalDate.toLocaleString('en-GB', {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //     hour12: false,
        // });

        return res.status(200).send(trans)
    }
    else{
        // khusus untuk seller dia bisa ngecek di transaksi ini barang milik dia apa saja dan berapa total yang dia dapat didalam satu transaksi ini
        let dtrans = await getOneTransSeller(trans.id, user.username)
        console.log(dtrans)

        if(dtrans.length == 0){
            return res.status(400).send({message: "Tidak ada produk anda dalam transaksi ini!"})
        }

        let profit = getProfit(dtrans)

        trans.deliveryPrice = "Rp. " + parseInt(trans.deliveryPrice).toLocaleString("ID-id")
        for (const d of dtrans) {
            d.product.price = "Rp. " + parseInt(d.product.price).toLocaleString("ID-id")
            d.subtotal = "Rp. " + parseInt(d.subtotal).toLocaleString("ID-id")
        }
        profit = "Rp. " + parseInt(profit).toLocaleString("ID-id")

        trans.detail = dtrans
        trans.profit = profit

        // trans.arrivalDate = trans.arrivalDate.toLocaleString('en-GB', {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit',
        //     hour12: false,
        // });

        return res.status(200).send(trans)
    }
}

const getMyTransaction = async (req, res) => {
    const user = req.user
    let trans = null

    if(user.role == "USR"){
        let list_trans = await getAllTransUser(user)
        let total = getAllTotal(list_trans)

        for (const t of list_trans) {
            t.deliveryPrice = "Rp. " + parseInt(t.deliveryPrice).toLocaleString("ID-id")
            t.total = "Rp. " + parseInt(t.total).toLocaleString("ID-id")
        }

        trans = {
            list: list_trans,
            total: total
        }
    }
    else{
        let dtrans = await getAllTransSeller(user)
        let profit = getAllProfit(dtrans)

        for (const d of dtrans) {
            d.product.price = "Rp. " + parseInt(d.product.price).toLocaleString("ID-id")
            d.subtotal = "Rp. " + parseInt(d.subtotal).toLocaleString("ID-id")
        }

        trans = {
            list: dtrans,
            total_profit: profit
        }
    }

    return res.status(200).send(trans)
}

module.exports = {
    getOneTransaction,
    getMyTransaction,
}