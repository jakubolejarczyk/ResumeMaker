using QuestPDF.Fluent;

namespace ResumeMakerApi.Source.Builders;

public class ResumeBuilder : IResumeBuilder
{
    public byte[] Build()
    {
        using var stream = new MemoryStream();
        Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Content().Column(col =>
                {
                    col.Item().Text("Page 1");
                });
            });
            container.Page(page =>
            {
                page.Content().Column(col =>
                {
                    col.Item().Text("Page 2");
                });
            });
        }).GeneratePdf(stream);
        return stream.ToArray();
    }
}
