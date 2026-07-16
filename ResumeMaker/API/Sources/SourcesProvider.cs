using API.Sources.Controllers;
using API.Sources.Services;
using API.Sources.Stores;

namespace API.Sources;

public static class SourcesProvider
{
    public static void BuilderProvider(WebApplicationBuilder builder)
    {
        ControllersProvider.BuilderProvider(builder);
        ServicesProvider.BuilderProvider(builder);
        StoresProvider.BuilderProvider(builder);
    }

    public static void AppProvider(WebApplication app)
    {
        ControllersProvider.AppProvider(app);
        ServicesProvider.AppProvider(app);
        StoresProvider.AppProvider(app);
    }
}
