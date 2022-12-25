//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const { getBalanceOfAddress, getTransactionsOfAddress, generateKeyPair } = require('../controller/User')

//path to our proto file
const PROTO_FILE = "./protos/user.proto";

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
const userProto = grpc.loadPackageDefinition(pkgDefs).user;

//-------------------------------------------------------------

async function getBalanceOfAddress(req, res) {
  const balance = await getBalanceOfAddress(req.body.Address);
  res.json(balance);
}

async function getTransactionsOfAddress(req, res) {
  const transactions = await getTransactionsOfAddress(req.body.Address);
  res.json(transactions);
}

async function generateKeyPair(req, res) {
  const keyPair = generateKeyPair();
  res.json(keyPair);
}

function main() {

  //create gRPC server
  const server = new grpc.Server();

  server.addService(userProto.UserService.service, {
    getBalanceOfAddress: getBalanceOfAddress,
    getTransactionsOfAddress: getTransactionsOfAddress,
    generateKeyPair: generateKeyPair 
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
