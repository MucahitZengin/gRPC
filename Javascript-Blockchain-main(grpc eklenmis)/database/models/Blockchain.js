const mongoose = require('mongoose');
let Schema = mongoose.Schema;



let BlockchainSchema = new Schema({ 

    chain: {
        required: true,
        type: Schema.Types.Array, 
    },

    difficulty: {
        required: true,
        type: Schema.Types.Number, 
    },

    pendingTransactions : {
        required: true,
        type: Schema.Types.Array
    },

    miningReward : {
        required: true,
        type: Schema.Types.Number
    }

})

module.exports = mongoose.model('BlockchainDB',BlockchainSchema)