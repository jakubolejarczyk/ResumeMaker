using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;
using API.Sources.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService service) : ControllerBase
{
    [HttpPost]
    public ActionResult<ResponseCore<UserResponse>> Create([FromBody] UserRequest request) => Ok(service.Create(request));

    [HttpGet("{id}")]
    public ActionResult<ResponseCore<UserResponse>> Read(int id) => Ok(service.Read(id));

    [HttpGet]
    public ActionResult<ResponseCore<List<UserResponse>>> ReadAll() => Ok(service.ReadAll());

    [HttpPatch("{id}")]
    public ActionResult<ResponseCore<UserResponse>> Update(int id, [FromBody] UserRequest request) => Ok(service.Update(id, request));

    [HttpDelete("{id}")]
    public ActionResult<ResponseCore<UserResponse>> Delete(int id) => Ok(service.Delete(id));
}
