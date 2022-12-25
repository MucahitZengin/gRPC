const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');
const { Transaction } = require('../src/blockchain');
const blockChainDbHelper = new BlockChainDbHelper();

const AddTransaction = function(fromAddress, toAddress, amount) {
    blockChainDbHelper.AddTransaction(fromAddress, toAddress, amount);
}

const minerPendingTransactions = function(minerRewardAddress) {
    blockChainDbHelper.minerPendingTransactions(minerRewardAddress);
}

const getPendingTransactions = function() {
    return blockChainDbHelper.getPendingTransactions();
}

module.exports = {AddTransaction , minerPendingTransactions, getPendingTransactions};