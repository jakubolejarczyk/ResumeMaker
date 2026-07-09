using Microsoft.AspNetCore.Mvc;
using ResumeMakerApi.Source.Services;

namespace ResumeMakerApi.Source.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(IResumeService resumeService) : ControllerBase
{
    [HttpGet]
    public ActionResult<byte[]> Get()
    {
        var bytes = resumeService.Run();
        var resume = File(bytes, "application/pdf", "resume.pdf");
        return Ok(resume);
    }
}
