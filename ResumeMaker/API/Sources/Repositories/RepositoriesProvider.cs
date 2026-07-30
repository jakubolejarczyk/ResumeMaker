namespace API.Sources.Repositories;

public static class RepositoriesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
    }
}
