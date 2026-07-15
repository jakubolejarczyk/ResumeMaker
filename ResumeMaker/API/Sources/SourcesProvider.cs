using API.Sources.Controllers;

namespace API.Sources;

public static class SourcesProvider
{
    public static void BuilderProvider(WebApplicationBuilder builder)
    {
        ControllersProvider.BuilderProvider(builder);
    }

    public static void AppProvider(WebApplication app)
    {
        ControllersProvider.AppProvider(app);
    }
}
