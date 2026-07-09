using ResumeMakerApi.Source.Builders;

namespace ResumeMakerApi.Source.Services;

public static class ServicesProvider
{
    public static void ProvideBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IResumeBuilder, ResumeBuilder>();
    }
}
