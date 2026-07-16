namespace API.Sources.Repositories;

public static class RepositoriesProvider
{
    public static void BuilderProvider(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IUserRepository, UserRepository>();
    }

    public static void AppProvider(WebApplication app)
    {
    }
}
