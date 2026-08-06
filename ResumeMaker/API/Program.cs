using QuestPDF.Infrastructure;
using API.Sources;

QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

SourcesProvider.GetBuilder(builder);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

SourcesProvider.GetApp(app);

app.Map("/", () =>
{
    return "API works!";
});

app.Run();
