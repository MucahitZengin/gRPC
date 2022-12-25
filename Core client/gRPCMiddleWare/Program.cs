//using gRPCMiddleWare.Services;

//internal class Program
//{
//    private static void Main(string[] args)
//    {
//        var builder = WebApplication.CreateBuilder(args);

//        // Additional configuration is required to successfully run gRPC on macOS.
//        // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

//        // Add services to the container.
//        builder.Services.AddGrpc();

//        var app = builder.Build();

//        // Configure the HTTP request pipeline.
//        app.MapGrpcService<GreeterService>();
//        app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

//        app.Run();
//    }
//}



using Grpc.Net.Client;
using static gRPCMiddleWare.GreeterService;
using System.Timers;
using Timer = System.Timers.Timer;

public static class Program
{
    public static GreeterServiceClient client;
    public static GrpcChannel channel;
    private static void Main(string[] args)
    {
        channel = GrpcChannel.ForAddress("http://localhost:5001");
        client = new GreeterServiceClient(channel);

        // Create a timer that will execute the SendRequest method every 5 seconds
        Timer timer = new Timer(5000);
        timer.Elapsed += SendRequest;
        timer.Start();

        Console.ReadLine();
    }

    private static void SendRequest(object sender, ElapsedEventArgs e)
    {
        // Send the request and print the response
        var yanit = client.SayHello(new gRPCMiddleWare.istek { Name = "Merhaba node server, ben core client!" });
        if (yanit != null && yanit.Mesaj != null) { Console.WriteLine(yanit.Mesaj); }
    }
}