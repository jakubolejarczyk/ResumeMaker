using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Services.Resumes;
using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(IResumeService service) : ControllerBase
{
    [HttpPost]
    public ActionResult<ResponseCore<ResumeResponse>> CreateResume([FromBody] ResumeRequest request)
    {
        var response = service.CreateResume(request);
        return Ok(response);
    }

    [HttpGet("user/{userId}")]
    public ActionResult<ResponseCore<List<ResumeResponse>>> ReadResumes(int userId)
    {
        var response = service.ReadResumesByUserId(userId);
        return Ok(response);
    }
}
