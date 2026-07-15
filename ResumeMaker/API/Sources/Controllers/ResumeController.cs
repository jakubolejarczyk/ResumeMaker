using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    [HttpGet]
    public string GetResume()
    {
        return "Hello from ResumeController";
    }
}
