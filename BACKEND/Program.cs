using BACKEND.Data;

namespace BACKEND
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();
            builder.Services.AddSingleton<ITeamClusterRepository, TeamClusterRepository>();


            var app = builder.Build();


            app.UseRouting();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
            
            app.MapGet("/", () => "Hello World!");
            
            app.UseCors(x => x
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://127.0.0.1:5500"));

            app.Run();
        }
    }
}
