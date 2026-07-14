using ResumeMakerApi.Source.Builders;
using ResumeMakerApi.Source.Contexts;
using ResumeMakerApi.Source.Controllers;
using ResumeMakerApi.Source.Repositories;
using ResumeMakerApi.Source.Services;

namespace ResumeMakerApi.Source;

public static class SourceProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        RepositoriesProvider.Builder(builder);
        ControllersProvider.Builder(builder);
        BuildersProvider.Builder(builder);
        ServicesProvider.Builder(builder);
        ContextsProvider.Builder(builder);
    }
}
