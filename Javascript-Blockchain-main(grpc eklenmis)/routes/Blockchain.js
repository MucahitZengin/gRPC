const express = require('express')
const {getBlockchain,getBlockByHash,getDifficultyAndminingReward,setDifficultyAndminingReward}  = require('../controller/Blockchain')
const router = express.Router()

router.get('/getBlockchain', async (req, res) => {
    const blockchain = await getBlockchain();
    res.json(blockchain);
})

router.get('/getBlockByHash/:hash', async (req, res) => {
    const block = await getBlockByHash(req.params.hash);
    res.setHeader('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Credentials', true);
    res.json(block);
})

router.get('/getDifficultyAndminingReward', async (req, res) => {
    const difficultyAndminingReward = await getDifficultyAndminingReward();
    res.json(difficultyAndminingReward);
})

router.post('/setDifficultyAndminingReward', async (req, res) => {
    const newSettings = await setDifficultyAndminingReward(req.body.difficulty,req.body.reward);
    res.json(newSettings);
})

module.exports = router