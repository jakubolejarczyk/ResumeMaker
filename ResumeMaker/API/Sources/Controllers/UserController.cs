using API.Sources.Models;
using API.Sources.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService service) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<User?>> ReadUserAsync(int id)
    {
        var result = await service.ReadUserAsync(id);
        return result is null ? NotFound("User with the given Id was not found.") : Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> ReadUsersAsync()
    {
        return Ok(await service.ReadUsersAsync());
    }
}
