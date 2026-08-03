namespace API.Sources.Repositories;

public static class RepositoriesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
        builder.Services.AddScoped<IEducationRepository, EducationRepository>();
        builder.Services.AddScoped<IExperienceRepository, ExperienceRepository>();
        builder.Services.AddScoped<IExperienceDescriptionRepository, ExperienceDescriptionRepository>();
        builder.Services.AddScoped<IResumeRepository, ResumeRepository>();
        builder.Services.AddScoped<ISkillGroupRepository, SkillGroupRepository>();
        builder.Services.AddScoped<ISocialMediaRepository, SocialMediaRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
    }
}
