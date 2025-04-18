namespace BACKEND
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();


            var app = builder.Build();


            app.MapGet("/", () => "Hello World!");

            app.Run();
        }
    }
}
