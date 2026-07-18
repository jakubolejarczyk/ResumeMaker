using API.Sources.Controllers;
using API.Sources.Repositories;
using API.Sources.Stores;

namespace API.Sources;

public static class SourcesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        ControllersProvider.GetBuilder(builder);
        RepositoriesProvider.GetBuilder(builder);
        ServicesProvider.GetBuilder(builder);
        StoresProvider.GetBuilder(builder);
    }

    public static void GetApp(WebApplication app)
    {
        ControllersProvider.GetApp(app);
    }
}
