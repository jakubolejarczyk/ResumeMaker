using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;
using API.Sources.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService service) : ControllerBase
{
    [HttpPost]
    public ActionResult<ResponseCore<UserResponse>> Create([FromBody] UserRequest request)
    {
        var response = service.Create(request);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public ActionResult<ResponseCore<UserResponse>> Read(int id)
    {
        var response = service.Read(id);
        return Ok(response);
    }

    [HttpGet]
    public ActionResult<ResponseCore<List<UserResponse>>> ReadAll()
    {
        var response = service.ReadAll();
        return Ok(response);
    }

    [HttpPatch("{id}")]
    public ActionResult<ResponseCore<UserResponse>> Update(int id, [FromBody] UserRequest request)
    {
        var response = service.Update(id, request);
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public ActionResult<ResponseCore<UserResponse>> Delete(int id)
    {
        var response = service.Delete(id);
        return Ok(response);
    }
}
