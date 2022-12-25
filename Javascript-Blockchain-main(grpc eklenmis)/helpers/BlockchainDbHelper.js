const BlockchainDB = require('../database/models/Blockchain');
const { Blockchain, Block, Transaction } = require('../src/blockchain')



class BlockChainDbHelper {

    GetBlockchain = async function () {
        const blockchain = await BlockchainDB.find();
        let RecycleCoin = new Blockchain(blockchain[0]["chain"], blockchain[0]["difficulty"], blockchain[0]["miningReward"], blockchain[0]["pendingTransactions"]);
        return RecycleCoin;
    }
    AddTransaction = async function (fromAddress, toAddress, amount) {
        var RecycleCoin = await this.GetBlockchain();
        var EC = require('elliptic').ec;
        var ec = new EC('secp256k1');
        var key = ec.keyFromPrivate(fromAddress);
        var walletAddress = key.getPublic('hex');
        var transaction = new Transaction(walletAddress, toAddress, amount);
        transaction.signTransaction(key);
        transaction.TransactionisValid = transaction.isValid();
        RecycleCoin.addTransaction(transaction);
        
        const newBlockchain = await BlockchainDB.updateOne({
            chain: RecycleCoin.chain,
            difficulty: RecycleCoin.difficulty,
            pendingTransactions: RecycleCoin.pendingTransactions,
            miningReward: RecycleCoin.miningReward

        })
    }
    minerPendingTransactions = async function (minerRewardAddress) {
        const blockchain = await this.GetBlockchain();
        blockchain.minePendingTransactions(minerRewardAddress);
        const newBlockchain = await BlockchainDB.updateOne({
            chain: blockchain.chain,
            difficulty: blockchain.difficulty,
            pendingTransactions: blockchain.pendingTransactions,
            miningReward: blockchain.miningReward
        })
    }
    getBlockByHash = async function (hash) {
        const blockchain = await this.GetBlockchain();
        return blockchain.chain.find(block => block.hash === hash);
    }

    getBalanceOfAddress = async function (address) {
        const blockchain = await this.GetBlockchain();
        return blockchain.getBalanceOfAddress(address);
    }

    getTransactionsOfAddress = async function (address) {
        
        const blockchain = await this.GetBlockchain();
        var transactions = [];
        for (const block of blockchain.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address || transaction.toAddress === address) {
                    transactions.push(transaction);
                }
            }
        }
        return transactions;
    }

    getDifficultyAndminingReward = async function () {
        const blockchain = await this.GetBlockchain();
        return { difficulty: blockchain.difficulty, miningReward: blockchain.miningReward };
    }

    setDifficultyAndminingReward = async function (difficulty, miningReward) {
        const blockchain = await this.GetBlockchain();
        blockchain.difficulty = difficulty;
        blockchain.miningReward = miningReward;
        const newBlockchain = await BlockchainDB.updateOne({
            chain: blockchain.chain,
            difficulty: blockchain.difficulty,
            pendingTransactions: blockchain.pendingTransactions,
            miningReward: blockchain.miningReward
        })
    }

    getPendingTransactions = async function () {
        const blockchain = await this.GetBlockchain();
        return blockchain.pendingTransactions;
    }
}

module.exports = BlockChainDbHelper;