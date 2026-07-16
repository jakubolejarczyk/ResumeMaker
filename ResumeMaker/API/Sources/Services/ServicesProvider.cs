namespace API.Sources.Services;

public static class ServicesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IUserService, UserService>();
    }

    public static void GetApp(WebApplication app)
    {
    }
}
