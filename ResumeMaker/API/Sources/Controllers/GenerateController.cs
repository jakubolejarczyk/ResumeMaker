using API.Sources.Cores;
using API.Sources.Responses;
using API.Sources.Services;
using Microsoft.AspNetCore.Mvc;


namespace API.Sources.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GenerateController(
    IResumeService service,
    IResumePdfService pdfService
) : ControllerBase
{

    [HttpPost("{id}")]
    public IActionResult Create(int id)
    {

        ResponseCore<ResumeResponse> response = service.Read(id);


        if (!response.Success || response.Body == null)
        {
            return BadRequest(response.Message);
        }


        var pdf = pdfService.Generate(response.Body);


        return File(
            pdf,
            "application/pdf",
            $"CV-{response.Body.Name}.pdf"
        );
    }
}