const express = require('express')
const {AddTransaction,minerPendingTransactions,getPendingTransactions}  = require('../controller/Transaction')
const router = express.Router()

router.post('/AddTransaction', async (req, res) => {
    AddTransaction(req.body.fromAddress, req.body.toAddress, parseInt(req.body.amount));
    res.json({ note: 'Transaction added successfully.' });
})

router.post('/minerPendingTransactions', async (req, res) => {
    minerPendingTransactions(req.body.minerRewardAddress);
    res.json({ note: 'Mine is successfully' });
})

router.get('/getPendingTransactions', async (req, res) => {
    const pendingTransactions = await getPendingTransactions();
    res.json(pendingTransactions);
})

router.get('/getPendingTransactionCount', async (req, res) => {
    const pendingTransactions = await getPendingTransactions();
    res.setHeader('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Credentials', true);
    res.json(pendingTransactions.length);
})




module.exports = router