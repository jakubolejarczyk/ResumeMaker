namespace ResumeMakerApi.Source.Controllers;

public class ControllersProvider
{
    public static void Builder(WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
    }
}
