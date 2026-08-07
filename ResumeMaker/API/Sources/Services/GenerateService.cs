using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace API.Sources.Services;

public class GenerateService : IGenerateService
{
    public FileContentResult Generate(int userId, int companyId, int resumeId)
    {
        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(40);
                page.Content()
                    .AlignCenter()
                    .AlignMiddle()
                    .Text("Hello World!")
                    .FontSize(40)
                    .Bold();
            });
        });
        var pdf = document.GeneratePdf();
        return new FileContentResult(pdf, "application/pdf")
        {
            FileDownloadName = $"resume-{userId}-{companyId}-{resumeId}.pdf"
        };
    }
}
