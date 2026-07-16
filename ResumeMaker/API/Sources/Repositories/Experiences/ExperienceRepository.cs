using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.Experiences;

public class ExperienceRepository(ExperienceStore store) : IExperienceRepository
{
    public RepositoryDTO<Experience> Create(Experience experience)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Experience> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Experience> Read(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<Experience>> ReadAll()
    {
        var experiences = store.Date;
        return new RepositoryDTO<List<Experience>>
        {
            Success = true,
            Message = $"Successfully retrieved {experiences.Count} experiences.",
            Body = experiences
        };
    }

    public RepositoryDTO<Experience> Update(int id, Experience experience)
    {
        throw new NotImplementedException();
    }
}
