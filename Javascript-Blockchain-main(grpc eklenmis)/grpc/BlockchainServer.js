//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const {getBlockchain,getBlockByHash,getDifficultyAndminingReward,setDifficultyAndminingReward}  = require('../controller/Blockchain')

//path to our proto file
const PROTO_FILE = "./protos/blockchain.proto";

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
const blockchainProto = grpc.loadPackageDefinition(pkgDefs).blockchain;

//-------------------------------------------------------------

async function getBlockchain(req, res) {
    const blockchain = await getBlockchain();
    res.json(blockchain);
}

async function getBlockByHash(req, res) {
    const block = await getBlockByHash(req.params.hash);
    res.setHeader('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Credentials', true);
    res.json(block);
}

async function getDifficultyAndminingReward(req, res) {
    const difficultyAndminingReward = await getDifficultyAndminingReward();
    res.json(difficultyAndminingReward);
}

async function setDifficultyAndminingReward(req, res) {
    const newSettings = await setDifficultyAndminingReward(req.body.difficulty,req.body.reward);
    res.json(newSettings);
}


function main() {

  //create gRPC server
  const server = new grpc.Server();

  server.addService(blockchainProto.BlockchainService.service, {
    getBlockchain: getBlockchain,
    getBlockByHash: getBlockByHash,
    getDifficultyAndminingReward: getDifficultyAndminingReward,
    setDifficultyAndminingReward: setDifficultyAndminingReward
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
