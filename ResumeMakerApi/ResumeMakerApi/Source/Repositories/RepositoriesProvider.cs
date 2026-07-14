namespace ResumeMakerApi.Source.Repositories;

public static class RepositoriesProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ResumeRepository>();
    }
}
