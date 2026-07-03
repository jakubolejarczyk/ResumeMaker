using Microsoft.AspNetCore.Mvc;
using ResumeMakerApi.Source.DTOs;
using ResumeMakerApi.Source.Services;

namespace ResumeMakerApi.Source.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(IResumeService resumeService) : ControllerBase
{
    [HttpGet("{userId}")]
    public ActionResult<ResumeDto> GetResume(int userId)
    {
        var result = resumeService.GetResume(userId);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
}
