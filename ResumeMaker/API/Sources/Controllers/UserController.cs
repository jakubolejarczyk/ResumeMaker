using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet]
    public ActionResult<string> GetUser()
    {
        return Ok("Hello from UserController");
    }
}
