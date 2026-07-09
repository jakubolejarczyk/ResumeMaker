using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace ResumeMakerApi.Source.Builders;

public class ResumeBuilder : IResumeBuilder
{
    public byte[] Build()
    {
        using var stream = new MemoryStream();
        Document.Create(container => CreateResumePage(container)).GeneratePdf(stream);
        return stream.ToArray();
    }

    private IDocumentContainer CreateResumePage(IDocumentContainer container)
    {
        return container.Page(page =>
        {
            page.Margin(25);
            page.Content().Row(row =>
            {
                row.RelativeItem(3).Column(column =>
                {
                    column.Item().Text("Jakub Olejarczyk");
                    column.Item().Text("Software Engineer");
                });
                row.RelativeItem(1).Column(column =>
                {
                    column.Item().Text("Contact");
                });
            });
        });
    }
}
