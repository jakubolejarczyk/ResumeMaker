using API.Sources;

var builder = WebApplication.CreateBuilder(args);

SourcesProvider.GetBuilder(builder);

var app = builder.Build();

SourcesProvider.GetApp(app);

app.Run();
