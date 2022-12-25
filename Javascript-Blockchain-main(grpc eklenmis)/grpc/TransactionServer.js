//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const {AddTransaction,minerPendingTransactions,getPendingTransactions}  = require('../controller/Transaction')

//path to our proto file
const PROTO_FILE = "./protos/transaction.proto";

//options needed for loading Proto file
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);

//load Definition into gRPC
const transactionProto = grpc.loadPackageDefinition(pkgDefs).transaction;

//-------------------------------------------------------------

async function AddTransaction(req, res) {
    AddTransaction(req.body.fromAddress, req.body.toAddress, parseInt(req.body.amount));
    res.json({ note: 'Transaction added successfully.' });
}

async function minerPendingTransactions(req, res) {
    minerPendingTransactions(req.body.minerRewardAddress);
    res.json({ note: 'Mine is successfully' });
}

async function getPendingTransactions(req, res) {
    const pendingTransactions = await getPendingTransactions();
    res.json(pendingTransactions);
}

async function getPendingTransactionCount(req, res) {
    const pendingTransactions = await getPendingTransactions();
    res.setHeader('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Credentials', true);
    res.json(pendingTransactions.length);
}


function main() {

  //create gRPC server
  const server = new grpc.Server();

  server.addService(transactionProto.TransactionService.service, {
    AddTransaction: AddTransaction,
    minerPendingTransactions: minerPendingTransactions,
    getPendingTransactions: getPendingTransactions,
    getPendingTransactions: getPendingTransactionCount
  });

  //start the Server
  server.bindAsync(
    //port to serve on
    "127.0.0.1:5001",
    //authentication settings
    grpc.ServerCredentials.createInsecure(),
    //server start callback 
    (error, port) => {
      console.log(`listening on port ${port}`);
      server.start();
    }
  );
}

main();
