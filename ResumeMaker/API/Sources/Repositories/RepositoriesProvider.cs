namespace API.Sources.Repositories;

public static class RepositoriesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IUserRepository, UserRepository>();
    }

    public static void GetApp(WebApplication app)
    {
    }
}
