using API.Sources.Controllers;
using API.Sources.Services;

namespace API.Sources;

public static class SourcesProvider
{
    public static void BuilderProvider(WebApplicationBuilder builder)
    {
        ControllersProvider.BuilderProvider(builder);
        ServicesProvider.BuilderProvider(builder);
    }

    public static void AppProvider(WebApplication app)
    {
        ControllersProvider.AppProvider(app);
        ServicesProvider.AppProvider(app);
    }
}
