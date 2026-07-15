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
    public async Task<ActionResult<CreateUserResponse>> CreateUserAsync([FromBody] CreateUserRequest request)
    {
        var response = await service.CreateUserAsync(request);
        if (response.Success)
        {
            return Ok(response);
        }
        return BadRequest(response);
    }
}
