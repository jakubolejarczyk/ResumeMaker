using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;
using API.Sources.Services.Companies;
using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController(ICompanyService service) : ControllerBase
{
    [HttpPost]
    public ActionResult<ResponseCore<CompanyResponse>> CreateCompany([FromBody] CompanyRequest request)
    {
        var response = service.CreateCompany(request);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public ActionResult<ResponseCore<CompanyResponse>> ReadCompany(int id)
    {
        var response = service.ReadCompany(id);
        return Ok(response);
    }

    [HttpGet("user/{userId}")]
    public ActionResult<ResponseCore<List<CompanyResponse>>> ReadCompanies(int userId)
    {
        var response = service.ReadCompaniesByUserId(userId);
        return Ok(response);
    }

    [HttpPatch("{id}")]
    public ActionResult<ResponseCore<CompanyResponse>> UpdateCompany(int id, [FromBody] CompanyRequest request)
    {
        var response = service.UpdateCompany(id, request);
        return Ok(response);
    }

    [HttpDelete("{companyId}")]
    public ActionResult<ResponseCore<CompanyResponse>> DeleteCompany(int companyId)
    {
        var response = service.DeleteCompany(companyId);
        return Ok(response);
    }
}
