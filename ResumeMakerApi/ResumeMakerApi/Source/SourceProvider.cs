using ResumeMakerApi.Source.Builders;

namespace ResumeMakerApi.Source;

public static class SourceProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        BuildersProvider.Builder(builder);
    }
}
