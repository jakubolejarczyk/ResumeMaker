namespace ResumeMakerApi.Source.Services;

public static class ServicesProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IResumeService, ResumeService>();
    }
}
