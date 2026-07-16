namespace API.Sources.Stores;

public static class StoresProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IUserStore, UserStore>();
    }

    public static void GetApp(WebApplication app)
    {
    }
}
