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
    public async Task<ActionResult<CreateUserResponse>> CreateUser([FromBody] CreateUserRequest request)
    {
        var response = await service.CreateUser(request);
        if (response.Success)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReadUserResponse>> ReadUser(int id)
    {
        var response = await service.ReadUser(id);
        if (response.Success)
        {
            return Ok(response);
        }
        return NotFound(response);
    }

    [HttpGet]
    public async Task<ActionResult<ReadUsersResponse>> ReadUsers()
    {
        var response = await service.ReadUsers();
        if (response.Success)
        {
            return Ok(response);
        }
        return NotFound(response);
    }
}
