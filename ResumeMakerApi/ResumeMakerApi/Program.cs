using Microsoft.EntityFrameworkCore;
using QuestPDF.Infrastructure;
using ResumeMakerApi.Source;
using ResumeMakerApi.Source.Context;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

QuestPDF.Settings.License = LicenseType.Community;

// Add services to the container.

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

SourceProvider.Builder(builder);

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors(c =>
{
    c.AllowAnyOrigin();
    c.AllowAnyMethod();
    c.AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
