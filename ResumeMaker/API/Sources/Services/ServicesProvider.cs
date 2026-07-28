using API.Sources.Services.Users;

namespace API.Sources.Services;

public static class ServicesProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IUserService, UserService>();
    }
}
