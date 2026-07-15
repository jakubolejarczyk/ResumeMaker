using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController : ControllerBase
{
    [HttpGet]
    public string GetCompany()
    {
        return "Hello from CompanyController";
    }
}
