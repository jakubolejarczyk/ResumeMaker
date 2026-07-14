using Microsoft.AspNetCore.Mvc;
using ResumeMakerApi.Source.Dtos;
using ResumeMakerApi.Source.Repositories;
using ResumeMakerApi.Source.Services;

namespace ResumeMakerApi.Source.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly IResumeService resumeService;

    public ResumeController(IResumeService resumeService)
    {
        this.resumeService = resumeService;
    }

    [HttpGet("{userId}")]
    public ActionResult<byte[]> Get(int userId)
    {
        var bytes = resumeService.Run();
        return File(bytes, "application/pdf", "resume.pdf");
    }
}
