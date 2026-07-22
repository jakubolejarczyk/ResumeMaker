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
    public ActionResult<ResponseCore<UserResponse>> CreateUser([FromBody] UserRequest request)
    {
        var response = service.CreateUser(request);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public ActionResult<ResponseCore<UserResponse>> ReadUser(int id)
    {
        var response = service.ReadUser(id);
        return Ok(response);
    }

    [HttpGet]
    public ActionResult<ResponseCore<List<UserResponse>>> ReadUsers()
    {
        var response = service.ReadUsers();
        return Ok(response);
    }

    [HttpPatch("{id}")]
    public ActionResult<ResponseCore<UserResponse>> UpdateUser(int id, [FromBody] UserRequest request)
    {
        var response = service.UpdateUser(id, request);
        return Ok(response);
    }

    [HttpDelete("{userId}")]
    public ActionResult<ResponseCore<UserResponse>> DeleteUsers(int userId)
    {
        var response = service.DeleteUser(userId);
        return Ok(response);
    }
}
