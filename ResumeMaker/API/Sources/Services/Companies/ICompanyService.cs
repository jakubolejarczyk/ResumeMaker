using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Companies;

public interface ICompanyService
{
    ResponseCore<CompanyResponse> CreateCompany(CompanyRequest request);

    ResponseCore<CompanyResponse> ReadCompany(int id);

    ResponseCore<List<CompanyResponse>> ReadCompanies();

    ResponseCore<CompanyResponse> UpdateCompany(int id, CompanyRequest request);

    ResponseCore<CompanyResponse> DeleteCompany(int id);
}
