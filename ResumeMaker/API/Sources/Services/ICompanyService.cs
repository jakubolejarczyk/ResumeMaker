using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public interface ICompanyService
{
    ResponseCore<CompanyResponse> Create(CompanyRequest request);

    ResponseCore<CompanyResponse> Read(int id);

    ResponseCore<List<CompanyResponse>> ReadAllForUser(int userId);

    ResponseCore<CompanyResponse> Update(int id, CompanyRequest request);

    ResponseCore<CompanyResponse> Delete(int id);
}
