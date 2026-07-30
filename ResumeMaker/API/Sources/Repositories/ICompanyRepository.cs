using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface ICompanyRepository
{
    ResponseCore<Company> Create(Company company);

    ResponseCore<Company> Read(int id);

    ResponseCore<List<Company>> ReadAllForUser(int userId);

    ResponseCore<Company> Update(int id, Company company);

    ResponseCore<Company> Delete(int id);
}
