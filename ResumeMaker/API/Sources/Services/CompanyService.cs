using API.Sources.Cores;
using API.Sources.Entities;
using API.Sources.Repositories;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public class CompanyService(ICompanyRepository repository) : ICompanyService
{
    public ResponseCore<CompanyResponse> Create(CompanyRequest request)
    {
        var company = new Company
        {
            CompanyName = request.CompanyName,
            City = request.City,
            Country = request.Country,
            IncludeConsentClause = request.IncludeConsentClause,
            CustomConsentClause = request.CustomConsentClause,
            RecruitmentStatus = request.RecruitmentStatus,
            UserId = request.UserId
        };
        var respomse = repository.Create(company);
        return new ResponseCore<CompanyResponse>
        {
            Success = respomse.Success,
            Message = respomse.Message,
            Body = respomse.Body == null ? null : new CompanyResponse
            {
                Id = respomse.Body.Id,
                CompanyName = respomse.Body.CompanyName,
                City = respomse.Body.City,
                Country = respomse.Body.Country,
                IncludeConsentClause = respomse.Body.IncludeConsentClause,
                CustomConsentClause = respomse.Body.CustomConsentClause,
                RecruitmentStatus = respomse.Body.RecruitmentStatus,
                UserId = respomse.Body.UserId
            }
        };
    }

    public ResponseCore<CompanyResponse> Read(int id)
    {
        var response = repository.Read(id);
        return new ResponseCore<CompanyResponse>
        {
            Success = response.Success,
            Message = response.Message,
            Body = response.Body == null ? null : new CompanyResponse
            {
                Id = response.Body.Id,
                CompanyName = response.Body.CompanyName,
                City = response.Body.City,
                Country = response.Body.Country,
                IncludeConsentClause = response.Body.IncludeConsentClause,
                CustomConsentClause = response.Body.CustomConsentClause,
                RecruitmentStatus = response.Body.RecruitmentStatus,
                UserId = response.Body.UserId
            }
        };
    }

    public ResponseCore<List<CompanyResponse>> ReadAllForUser(int userId)
    {
        var response = repository.ReadAllForUser(userId);
        return new ResponseCore<List<CompanyResponse>>
        {
            Success = response.Success,
            Message = response.Message,
            Body = response.Body == null ? [] : response.Body
                .Select(b => new CompanyResponse
                {
                    Id = b.Id,
                    CompanyName = b.CompanyName,
                    City = b.City,
                    Country = b.Country,
                    IncludeConsentClause = b.IncludeConsentClause,
                    CustomConsentClause = b.CustomConsentClause,
                    RecruitmentStatus = b.RecruitmentStatus,
                    UserId = b.UserId
                })
                .ToList()
        };
    }

    public ResponseCore<CompanyResponse> Update(int id, CompanyRequest request)
    {
        var company = new Company
        {
            Id = id,
            CompanyName = request.CompanyName,
            City = request.City,
            Country = request.Country,
            IncludeConsentClause = request.IncludeConsentClause,
            CustomConsentClause = request.CustomConsentClause,
            RecruitmentStatus = request.RecruitmentStatus,
            UserId = request.UserId
        };
        var response = repository.Update(id, company);
        return new ResponseCore<CompanyResponse>
        {
            Success = response.Success,
            Message = response.Message,
            Body = response.Body == null ? null : new CompanyResponse
            {
                Id = response.Body.Id,
                CompanyName = response.Body.CompanyName,
                City = response.Body.City,
                Country = response.Body.Country,
                IncludeConsentClause = response.Body.IncludeConsentClause,
                CustomConsentClause = response.Body.CustomConsentClause,
                RecruitmentStatus = response.Body.RecruitmentStatus,
                UserId = response.Body.UserId
            }
        };
    }

    public ResponseCore<CompanyResponse> Delete(int id)
    {
        var response = repository.Delete(id);
        return new ResponseCore<CompanyResponse>
        {
            Success = response.Success,
            Message = response.Message
        };
    }
}
