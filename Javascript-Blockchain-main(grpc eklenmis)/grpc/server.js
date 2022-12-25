//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

//path to our proto file
const PROTO_FILE = "./protos/greet.proto";

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
const greeterProto = grpc.loadPackageDefinition(pkgDefs).greet;


/**
 * Implements the SayHello RPC method.
 */
function SayHello(input, callback) {
  console.log(input.request.name); //olmazsa namei silersin
  callback(null, { mesaj: "merhaba core client ben node server" });
}

function main() {

  //create gRPC server
  const server = new grpc.Server();

  //implement GreeterService
  server.addService(greeterProto.GreeterService.service, {
    SayHello: SayHello,
    //sayHelloAgain: sayHelloAgain
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
