const mongoose = require('mongoose');

const connectDatabase = () => {

    mongoose.connect("mongodb+srv://mstfucrr:blockchain@blockchain-cluster.cs4guue.mongodb.net/Blockchain-Database?retryWrites=true&w=majority", { useNewUrlParser: true })
        .then(() => {
            console.log("Mongoose connected");
        })
        .catch(err => {
            console.error(err);
        })
        
}
module.exports = connectDatabase;