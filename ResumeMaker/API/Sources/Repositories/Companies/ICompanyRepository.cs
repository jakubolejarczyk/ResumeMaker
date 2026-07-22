using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.Companies;

public interface ICompanyRepository
{
    RepositoryDTO<Company> Create(Company company);

    RepositoryDTO<Company> Read(int id);

    RepositoryDTO<List<Company>> ReadAllByUserId(int userId);

    RepositoryDTO<Company> Update(int id, Company company);

    RepositoryDTO<Company> Delete(int id);
}
