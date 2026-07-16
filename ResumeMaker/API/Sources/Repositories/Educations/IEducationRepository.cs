using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.Educations;

public interface IEducationRepository
{
    RepositoryDTO<Education> Create(Education education);

    RepositoryDTO<Education> Read(int id);

    RepositoryDTO<List<Education>> ReadAll();

    RepositoryDTO<Education> Update(int id, Education education);

    RepositoryDTO<Education> Delete(int id);
}
