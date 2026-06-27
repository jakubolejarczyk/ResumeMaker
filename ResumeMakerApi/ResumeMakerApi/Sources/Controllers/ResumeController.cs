using Microsoft.AspNetCore.Mvc;
using ResumeMakerApi.Sources.Models.Requests;
using ResumeMakerApi.Sources.Services;

namespace ResumeMakerApi.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(IResumeService service) : ControllerBase
{
    [HttpPost]
    public ActionResult<string> GetResume(ResumeRequest request)
    {
        return service.GetResume(request);
    }
}
