using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;
using ResumeMakerApi.Source.DTOs;
using ResumeMakerApi.Source.Services;

namespace ResumeMakerApi.Source.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(IResumeService resumeService) : ControllerBase
{
    [HttpGet("{userId}")]
    public IActionResult GetResume(int userId)
    {
        var result = resumeService.GetResume(userId);
        if (result == null)
        {
            return NotFound();
        }
        var pdfBytes = GenerateSimplePdf(result);
        return File(
            pdfBytes,
            "application/pdf",
            "raport.pdf"
        );
    }

    public byte[] GenerateSimplePdf(ResumeDto dto)
    {
        using var stream = new MemoryStream();

        Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(30);

                page.Content().Column(col =>
                {
                    col.Item().Text(dto.LastName + " " + dto.FirstName)
                        .FontSize(20)
                        .Bold();

                    col.Item().Text("To jest przykładowy raport generowany dynamicznie.");

                    col.Item().PaddingTop(20)
                        .Text($"Data: {DateTime.Now}");
                });
            });
        })
        .GeneratePdf(stream);

        return stream.ToArray();
    }
}
