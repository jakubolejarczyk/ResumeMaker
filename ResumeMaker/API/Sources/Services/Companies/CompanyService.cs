using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Companies;

public class CompanyService : ICompanyService
{
    public ResponseCore<CompanyResponse> CreateCompany(CompanyRequest request)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<CompanyResponse> DeleteCompany(int id)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<List<CompanyResponse>> ReadCompanies()
    {
        throw new NotImplementedException();
    }

    public ResponseCore<CompanyResponse> ReadCompany(int id)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<CompanyResponse> UpdateCompany(int id, CompanyRequest request)
    {
        throw new NotImplementedException();
    }
}
