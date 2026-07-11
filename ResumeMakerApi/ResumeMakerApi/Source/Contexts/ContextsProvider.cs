using Microsoft.EntityFrameworkCore;

namespace ResumeMakerApi.Source.Contexts;

public static class ContextsProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
    }
}
