using API.Sources.Cores;
using API.Sources.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    [HttpPost]
    public ActionResult<ResponseCore<ResumeResponse>> CreateCompany([FromBody] ResumeRequest request)
    {
        return Ok(request);
    }
}
