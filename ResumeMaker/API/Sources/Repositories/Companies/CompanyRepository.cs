using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.Companies;

public class CompanyRepository(CompanyStore store) : ICompanyRepository
{
    public RepositoryDTO<Company> Create(Company company)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Company> Read(int id)
    {
        var company = store.Data.FirstOrDefault(c => c.Id == id);
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
        var companies = store.Data;
        return new RepositoryDTO<List<Company>>
        {
            Success = true,
            Message = $"Successfully retrieved {companies.Count} companies.",
            Body = companies
        };
    }

    public RepositoryDTO<Company> Update(int id, Company company)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Company> Delete(int id)
    {
        var company = store.Data.FirstOrDefault(c => c.Id == id);
        if (company == null)
        {
            return new RepositoryDTO<Company>
            {
                Success = false,
                Message = "Failed to delete the company because it does not exist."
            };
        }
        store.Data.Remove(company);
        return new RepositoryDTO<Company>
        {
            Success = true,
            Message = "Successfully deleted the company.",
            Body = company
        };
    }
}
