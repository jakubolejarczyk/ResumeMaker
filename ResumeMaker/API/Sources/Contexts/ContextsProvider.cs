using Microsoft.EntityFrameworkCore;

namespace API.Sources.Contexts;

public static class ContextsProvider
{
    public static void GetBuilder(WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
    }
}
