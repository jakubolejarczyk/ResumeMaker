using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.Experiences;

public interface IExperienceRepository
{
    RepositoryDTO<Experience> Create(Experience experience);

    RepositoryDTO<Experience> Read(int id);

    RepositoryDTO<List<Experience>> ReadAll();

    RepositoryDTO<Experience> Update(int id, Experience experience);

    RepositoryDTO<Experience> Delete(int id);
}
