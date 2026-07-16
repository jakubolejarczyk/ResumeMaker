using Scalar.AspNetCore;

namespace API.Sources.Controllers;

public static class ControllersProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        builder.Services.AddOpenApi();
    }

    public static void GetApp(WebApplication app)
    {
        app.MapControllers();
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }
    }
}
