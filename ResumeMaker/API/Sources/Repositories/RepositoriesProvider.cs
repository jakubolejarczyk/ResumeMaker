using API.Sources.Repositories.Companies;
using API.Sources.Repositories.Educations;
using API.Sources.Repositories.ExperienceDescriptions;
using API.Sources.Repositories.Experiences;
using API.Sources.Repositories.Resumes;
using API.Sources.Repositories.SkillElements;
using API.Sources.Repositories.SkillGroups;
using API.Sources.Repositories.SocialMedias;
using API.Sources.Repositories.Users;

namespace API.Sources.Repositories;

public static class RepositoriesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
        builder.Services.AddScoped<IEducationRepository, EducationRepository>();
        builder.Services.AddScoped<IExperienceDescriptionRepository, ExperienceDescriptionRepository>();
        builder.Services.AddScoped<IExperienceRepository, ExperienceRepository>();
        builder.Services.AddScoped<IResumeRepository, ResumeRepository>();
        builder.Services.AddScoped<ISkillElementRepository, SkillElementRepository>();
        builder.Services.AddScoped<ISkillGroupRepository, SkillGroupRepository>();
        builder.Services.AddScoped<ISocialMediaRepository, SocialMediaRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
    }
}
