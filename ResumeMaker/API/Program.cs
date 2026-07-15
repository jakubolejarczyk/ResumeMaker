using API.Sources;

var builder = WebApplication.CreateBuilder(args);

SourcesProvider.BuilderProvider(builder);

var app = builder.Build();

SourcesProvider.AppProvider(app);

app.Run();
