using ResumeMakerApi.Source.Builders;
using ResumeMakerApi.Source.Controllers;
using ResumeMakerApi.Source.Services;

namespace ResumeMakerApi.Source;

public static class SourceProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        ControllersProvider.Builder(builder);
        BuildersProvider.Builder(builder);
        ServicesProvider.Builder(builder);
    }
}
