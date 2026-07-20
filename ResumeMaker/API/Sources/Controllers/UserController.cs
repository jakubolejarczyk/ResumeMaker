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
        if (response.Success)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }
}
