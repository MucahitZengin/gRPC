//dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

//path to our proto file
const PROTO_FILE = "./service_def.proto";

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
  const GreeterService = grpc.loadPackageDefinition(pkgDefs).GreeterService;
  
  //create the Client
  const client = new GreeterService(
    "localhost:5000",
    grpc.credentials.createInsecure()
  );
  
  console.log("1- istek gonderiyorum");
  client.SayHello({ name: "merhaba server ben client"}, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      console.log("4- yaniti aldim");
      console.log("yanit:");
      console.log(user);
    }
  });