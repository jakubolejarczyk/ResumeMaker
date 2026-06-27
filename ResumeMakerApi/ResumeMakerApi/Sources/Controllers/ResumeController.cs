using Microsoft.AspNetCore.Mvc;
using ResumeMakerApi.Sources.Models.Responses;
using ResumeMakerApi.Sources.Services;

namespace ResumeMakerApi.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(IResumeService service) : ControllerBase
{
    [HttpGet("{userId}/resumes/{resumeId}")]
    public ActionResult<ResumeResponse> GetResume(int userId, int resumeId)
    {
        return Ok(service.GetResume(userId, resumeId));
    }
}
