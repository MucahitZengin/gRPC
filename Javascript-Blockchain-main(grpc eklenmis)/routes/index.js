const express = require('express')
const { getBlockchain, getBlockByHash, AddTransaction } = require('../controller/Blockchain')
const router = express.Router()
const Blockchain = require("./Blockchain")
const Transaction = require("./Transaction")
const User = require("./User")

router.use("/Blockchain", Blockchain);
router.use("/Transaction", Transaction);
router.use("/User", User);


module.exports = router