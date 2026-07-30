using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public class CompanyRepository(AppDbContext context) : ICompanyRepository
{
    public ResponseCore<Company> Create(Company company)
    {
        context.Companies.Add(company);
        context.SaveChanges();
        return new ResponseCore<Company>
        {
            Success = true,
            Message = "The company was created successfully.",
            Body = company
        };
    }

    public ResponseCore<Company> Read(int id)
    {
        var company = context.Companies.FirstOrDefault(c => c.Id == id);
        if (company == null)
        {
            return new ResponseCore<Company>
            {
                Success = false,
                Message = "Failed to retrieve the company."
            };
        }
        return new ResponseCore<Company>
        {
            Success = true,
            Message = "Successfully retrieved the company.",
            Body = company
        };
    }

    public ResponseCore<List<Company>> ReadAllForUser(int userId)
    {
        var companies = context.Companies.Where(c => c.UserId == userId).ToList();
        if (companies.Count > 0)
        {
            return new ResponseCore<List<Company>>
            {
                Success = true,
                Message = $"Successfully retrieved {companies.Count} companies.",
                Body = companies
            };
        }
        return new ResponseCore<List<Company>>
        {
            Success = false,
            Message = "No companies found."
        };
    }

    public ResponseCore<Company> Update(int id, Company company)
    {
        var companyById = context.Companies.FirstOrDefault(c => c.Id == id);
        if (companyById == null)
        {
            return new ResponseCore<Company>
            {
                Success = false,
                Message = "Failed to update the company because it does not exist."
            };
        }
        companyById.CompanyName = company.CompanyName;
        companyById.City = company.City;
        companyById.Country = company.Country;
        companyById.IncludeConsentClause = company.IncludeConsentClause;
        companyById.CustomConsentClause = company.CustomConsentClause;
        companyById.RecruitmentStatus = company.RecruitmentStatus;
        context.Companies.Update(companyById);
        context.SaveChanges();
        return new ResponseCore<Company>
        {
            Success = true,
            Message = "Successfully updated the company.",
            Body = companyById
        };
    }

    public ResponseCore<Company> Delete(int id)
    {
        var company = context.Companies.FirstOrDefault(c => c.Id == id);
        if (company == null)
        {
            return new ResponseCore<Company>
            {
                Success = false,
                Message = $"Failed to delete company because company with ID {id} does not exist."
            };
        }
        context.Companies.Remove(company);
        context.SaveChanges();
        return new ResponseCore<Company>
        {
            Success = true,
            Message = $"Company with ID {id} has been deleted successfully.",
            Body = company
        };
    }
}
