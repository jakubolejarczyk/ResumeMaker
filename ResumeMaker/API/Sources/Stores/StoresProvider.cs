namespace API.Sources.Stores;

public static class StoresProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<UserStore>();
    }

    public static void GetApp(WebApplication app)
    {
    }
}
