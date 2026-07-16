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

    public RepositoryDTO<Company> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Company> Read(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<Company>> ReadAll()
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Company> Update(int id, Company company)
    {
        throw new NotImplementedException();
    }
}
