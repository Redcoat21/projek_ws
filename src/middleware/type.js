const checkSaldo = async (req, res, next) => {
    req.body.saldo = parseInt(req.body.saldo)
    const {saldo} = req.body

    if(typeof saldo != "number"){
        return res.status(400).send({message: "saldo harus angka!"})
    }

    if(saldo < 1){
        return res.status(400).send({message: "Saldo tidak boleh 0 atau lebih kecil!"})
    }

    next();
}

module.exports = {
    checkSaldo,
}