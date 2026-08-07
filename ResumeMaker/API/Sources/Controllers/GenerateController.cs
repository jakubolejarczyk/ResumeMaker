using API.Sources.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GenerateController(IGenerateService service) : ControllerBase
{

    [HttpPost("{userId}/{companyId}/{resumeId}")]
    public IActionResult Generate(int userId, int companyId, int resumeId)
    {
        return service.Generate(userId, companyId, resumeId);
    }
}
