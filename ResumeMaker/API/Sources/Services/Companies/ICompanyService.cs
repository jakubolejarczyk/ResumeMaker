using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Companies;

public interface ICompanyService
{
    CreateCompanyResponse CreateCompany(CreateCompanyRequest request);

    ReadCompanyResponse ReadCompany(int id);

    ReadCompaniesResponse ReadCompanies();

    UpdateCompanyResponse UpdateCompany(int id, UpdateCompanyRequest request);

    DeleteCompanyResponse DeleteCompany(int id);
}
