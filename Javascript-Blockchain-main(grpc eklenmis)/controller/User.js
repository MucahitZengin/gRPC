const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');
const blockChainDbHelper = new BlockChainDbHelper();
const EC = require('elliptic').ec;

const getBalanceOfAddress = function(address) {
    var balance = blockChainDbHelper.getBalanceOfAddress(address);
    return balance;
}

const getTransactionsOfAddress = function(address) {
    var transactions = blockChainDbHelper.getTransactionsOfAddress(address);
    return transactions;
}

const generateKeyPair = function() {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    return {
        publicKey,
        privateKey
    };
}


module.exports = {getBalanceOfAddress ,getTransactionsOfAddress,generateKeyPair};