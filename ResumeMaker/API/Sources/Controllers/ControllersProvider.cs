namespace API.Sources.Controllers;

public static class ControllersProvider
{
    public static void BuilderProvider(WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        builder.Services.AddOpenApi();
    }

    public static void AppProvider(WebApplication app)
    {
        app.MapControllers();
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }
    }
}
