using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;
using API.Sources.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController(IResumeService service) : ControllerBase
{
    [HttpPost]
    public ActionResult<ResponseCore<ResumeResponse>> Create([FromBody] ResumeRequest request)
    {
        var response = service.Create(request);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public ActionResult<ResponseCore<ResumeResponse>> Read(int id)
    {
        var response = service.Read(id);
        return Ok(response);
    }

    [HttpGet("user/{userId}")]
    public ActionResult<ResponseCore<List<ResumeResponse>>> ReadAllForUser(int userId)
    {
        var response = service.ReadAllForUser(userId);
        return Ok(response);
    }

    [HttpPatch("{id}")]
    public ActionResult<ResponseCore<ResumeResponse>> Update(int id, [FromBody] ResumeRequest request)
    {
        var response = service.Update(id, request);
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public ActionResult<ResponseCore<ResumeResponse>> Delete(int id)
    {
        var response = service.Delete(id);
        return Ok(response);
    }
}
