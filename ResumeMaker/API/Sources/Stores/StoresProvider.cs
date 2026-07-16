namespace API.Sources.Stores;

public static class StoresProvider
{
    public static void BuilderProvider(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IUserStore, UserStore>();
    }

    public static void AppProvider(WebApplication app)
    {
    }
}
