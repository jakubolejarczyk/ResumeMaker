namespace ResumeMakerApi.Source.Builders;

public static class BuildersProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IResumeBuilder, ResumeBuilder>();
    }
}
