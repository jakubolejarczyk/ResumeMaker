using API.Sources.Contexts;
using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.Companies;

public class CompanyRepository(AppDbContext appDbContext) : ICompanyRepository
{
    public RepositoryDTO<Company> Create(Company company)
    {
        Console.WriteLine("Przed zapissem " + company.UserId);
        appDbContext.Companies.Add(company);
        appDbContext.SaveChanges();
        Console.WriteLine("Po zapissem " + company.UserId);
        return new RepositoryDTO<Company>
        {
            Success = true,
            Message = "The company was created successfully.",
            Body = company
        };
    }

    public RepositoryDTO<Company> Read(int id)
    {
        var company = appDbContext.Companies.FirstOrDefault(c => c.Id == id);
        if (company == null)
        {
            return new RepositoryDTO<Company>
            {
                Success = false,
                Message = "Failed to retrieve the company."
            };
        }
        return new RepositoryDTO<Company>
        {
            Success = true,
            Message = "Successfully retrieved the company.",
            Body = company
        };
    }

    public RepositoryDTO<List<Company>> ReadAll()
    {
        var companies = appDbContext.Companies.ToList();
        return new RepositoryDTO<List<Company>>
        {
            Success = true,
            Message = $"Successfully retrieved {companies.Count} companies.",
            Body = companies
        };
    }

    public RepositoryDTO<Company> Update(int id, Company company)
    {
        var currentCompany = appDbContext.Companies.FirstOrDefault(c => c.Id == id);
        if (currentCompany == null)
        {
            return new RepositoryDTO<Company>
            {
                Success = false,
                Message = "Failed to update the company because it does not exist."
            };
        }
        if (currentCompany.Id != company.Id)
        {
            return new RepositoryDTO<Company>
            {
                Success = false,
                Message = "Failed to update the company due to an internal error."
            };
        }
        currentCompany.CompanyName = company.CompanyName;
        currentCompany.City = company.City;
        currentCompany.Country = company.Country;
        currentCompany.IncludeConsentClause = company.IncludeConsentClause;
        currentCompany.CustomConsentClause = company.CustomConsentClause;
        currentCompany.RecruitmentStatus = company.RecruitmentStatus;
        appDbContext.Companies.Update(currentCompany);
        appDbContext.SaveChanges();
        return new RepositoryDTO<Company>
        {
            Success = true,
            Message = "Successfully updated the company.",
            Body = currentCompany
        };
    }

    public RepositoryDTO<Company> Delete(int id)
    {
        var company = appDbContext.Companies.FirstOrDefault(c => c.Id == id);
        if (company == null)
        {
            return new RepositoryDTO<Company>
            {
                Success = false,
                Message = "Failed to delete the company because it does not exist."
            };
        }
        appDbContext.Companies.Remove(company);
        appDbContext.SaveChanges();
        return new RepositoryDTO<Company>
        {
            Success = true,
            Message = "Successfully deleted the company.",
            Body = company
        };
    }
}
