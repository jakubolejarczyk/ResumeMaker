using API.Sources.Services.Companies;
using API.Sources.Services.Resumes;
using API.Sources.Services.Users;

namespace API.Sources.Repositories;

public static class ServicesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ICompanyService, CompanyService>();
        builder.Services.AddScoped<IResumeService, ResumeService>();
        builder.Services.AddScoped<IUserService, UserService>();
    }
}
