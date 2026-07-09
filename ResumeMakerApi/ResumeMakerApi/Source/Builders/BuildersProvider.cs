namespace ResumeMakerApi.Source.Builders;

public static class BuildersProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IResumeBuilder, ResumeBuilder>();
    }
}
