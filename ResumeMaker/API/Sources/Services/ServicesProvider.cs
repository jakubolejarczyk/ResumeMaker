namespace API.Sources.Services;

public static class ServicesProvider
{
    public static void BuilderProvider(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IUserService, UserService>();
    }

    public static void AppProvider(WebApplication app)
    {
    }
}
