using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using ResumeMakerApi.Source.Dtos;

namespace ResumeMakerApi.Source.Builders;

public class ResumeBuilder : IResumeBuilder
{
    public byte[] Build(ResumeDto resumeDto)
    {
        using var stream = new MemoryStream();
        Document.Create(container => CreateResumePage(container, resumeDto)).GeneratePdf(stream);
        return stream.ToArray();
    }

    private IDocumentContainer CreateResumePage(IDocumentContainer container, ResumeDto resumeDto)
    {
        return container.Page(page =>
        {
            page.Margin(25);
            page.Content().Row(row =>
            {
                row.RelativeItem(3).Column(column =>
                {
                    column.Item().Text(resumeDto.User.FirstName);
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
