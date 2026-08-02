namespace API.Sources.Repositories;

public static class RepositoriesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
        builder.Services.AddScoped<IEducationRepository, EducationRepository>();
        builder.Services.AddScoped<IResumeRepository, ResumeRepository>();
        builder.Services.AddScoped<ISocialMediaRepository, SocialMediaRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
    }
}
