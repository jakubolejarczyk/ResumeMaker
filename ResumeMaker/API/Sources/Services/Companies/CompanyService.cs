using API.Sources.Cores;
using API.Sources.Entities;
using API.Sources.Repositories.Companies;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Companies;

public class CompanyService(ICompanyRepository repository) : ICompanyService
{
    public ResponseCore<CompanyResponse> CreateCompany(CompanyRequest request)
    {
        var company = new Company()
        {
            CompanyName = request.CompanyName,
            City = request.City,
            Country = request.Country,
            IncludeConsentClause = request.IncludeConsentClause,
            CustomConsentClause = request.CustomConsentClause,
            RecruitmentStatus = request.RecruitmentStatus,
            UserId = request.UserId
        };
        var dto = repository.Create(company);
        var body = dto.Body;
        return new ResponseCore<CompanyResponse>
        {
            Success = dto.Success,
            Message = dto.Message,
            Body = body == null ? null : new CompanyResponse()
            {
                Id = body.Id,
                CompanyName = body.CompanyName,
                City = body.City,
                Country = body.Country,
                IncludeConsentClause = body.IncludeConsentClause,
                CustomConsentClause = body.CustomConsentClause,
                RecruitmentStatus = body.RecruitmentStatus,
                UserId = body.UserId
            }
        };
    }

    public ResponseCore<CompanyResponse> ReadCompany(int id)
    {
        var dto = repository.Read(id);
        var body = dto.Body;
        return new ResponseCore<CompanyResponse>
        {
            Success = dto.Success,
            Message = dto.Message,
            Body = body == null ? null : new CompanyResponse()
            {
                Id = body.Id,
                CompanyName = body.CompanyName,
                City = body.City,
                Country = body.Country,
                IncludeConsentClause = body.IncludeConsentClause,
                CustomConsentClause = body.CustomConsentClause,
                RecruitmentStatus = body.RecruitmentStatus,
                UserId = body.UserId
            }
        };
    }

    public ResponseCore<List<CompanyResponse>> ReadCompanies()
    {
        var dto = repository.ReadAll();
        var body = dto.Body;
        return new ResponseCore<List<CompanyResponse>>
        {
            Success = dto.Success,
            Message = dto.Message,
            Body = body == null ? [] : body
                .Select(b => new CompanyResponse()
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

    public ResponseCore<CompanyResponse> UpdateCompany(int id, CompanyRequest request)
    {
        var company = new Company()
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
        var dto = repository.Update(id, company);
        var body = dto.Body;
        return new ResponseCore<CompanyResponse>
        {
            Success = dto.Success,
            Message = dto.Message,
            Body = body == null ? null : new CompanyResponse()
            {
                Id = body.Id,
                CompanyName = body.CompanyName,
                City = body.City,
                Country = body.Country,
                IncludeConsentClause = body.IncludeConsentClause,
                CustomConsentClause = body.CustomConsentClause,
                RecruitmentStatus = body.RecruitmentStatus,
                UserId = body.UserId
            }
        };
    }

    public ResponseCore<CompanyResponse> DeleteCompany(int id)
    {
        var dto = repository.Delete(id);
        var body = dto.Body;
        return new ResponseCore<CompanyResponse>
        {
            Success = dto.Success,
            Message = dto.Message,
            Body = body == null ? null : new CompanyResponse()
            {
                Id = body.Id,
                CompanyName = body.CompanyName,
                City = body.City,
                Country = body.Country,
                IncludeConsentClause = body.IncludeConsentClause,
                CustomConsentClause = body.CustomConsentClause,
                RecruitmentStatus = body.RecruitmentStatus,
                UserId = body.UserId
            }
        };
    }
}
