using Microsoft.AspNetCore.Mvc;
using ResumeMakerApi.Source.Model;
using ResumeMakerApi.Source.Services;

namespace ResumeMakerApi.Source.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly IResumeService _service;

    public ResumeController(IResumeService service)
    {
        _service = service;
    }

    [HttpGet("{userId}/resumes/{resumeId}")]
    public ActionResult<ResumeResponse> GetResume(int userId, int resumeId)
    {
        return Ok(_service.GetResume(userId, resumeId));
    }
}
