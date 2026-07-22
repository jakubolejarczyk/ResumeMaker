namespace API.Sources.Stores;

public static class StoresProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<CompanyStore>();
        builder.Services.AddSingleton<EducationStore>();
        builder.Services.AddSingleton<ExperienceDescriptionStore>();
        builder.Services.AddSingleton<ExperienceStore>();
        builder.Services.AddSingleton<ResumeStore>();
        builder.Services.AddSingleton<SkillElementStore>();
        builder.Services.AddSingleton<SkillGroupStore>();
        builder.Services.AddSingleton<SocialMediaStore>();
    }
}
