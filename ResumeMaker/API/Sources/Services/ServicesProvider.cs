namespace API.Sources.Services;

public static class ServicesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ICompanyService, CompanyService>();
        builder.Services.AddScoped<IResumeService, ResumeService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IResumePdfService, ResumePdfService>();
    }
}
