const express = require('express')
const {getBalanceOfAddress ,getTransactionsOfAddress ,generateKeyPair }  = require('../controller/User')
const router = express.Router()


router.post('/getBalanceOfAddress', async (req, res) => {
    const balance = await getBalanceOfAddress(req.body.Address);
    res.json(balance);
})

router.post('/getTransactionsOfAddress', async (req, res) => {
    const transactions = await getTransactionsOfAddress(req.body.Address);
    res.json(transactions);
})

router.get('/generateKeyPair', async (req, res) => {
    const keyPair = generateKeyPair();
    res.json(keyPair);
})
    

module.exports = router