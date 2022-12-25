const BlockChainDbHelper = require('../helpers/BlockchainDbHelper');
const blockChainDbHelper = new BlockChainDbHelper();

const getBlockchain = function() {
    var blockchain = blockChainDbHelper.GetBlockchain();
    return blockchain;
}

const getBlockByHash = function(hash) {
    var block = blockChainDbHelper.getBlockByHash(hash);
    return block;
}

const getDifficultyAndminingReward = function() {
    var difficultyAndminingReward = blockChainDbHelper.getDifficultyAndminingReward();
    return difficultyAndminingReward;
}

const setDifficultyAndminingReward = function(difficulty, miningReward) {
    blockChainDbHelper.setDifficultyAndminingReward(difficulty, miningReward);
    return blockChainDbHelper.getDifficultyAndminingReward();
}

module.exports = {getBlockchain , getBlockByHash , getDifficultyAndminingReward,setDifficultyAndminingReward};