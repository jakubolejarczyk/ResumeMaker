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
        var experience = store.Data.FirstOrDefault(c => c.Id == id);
        if (experience == null)
        {
            return new RepositoryDTO<Experience>
            {
                Success = false,
                Message = "Failed to retrieve the experience."
            };
        }
        return new RepositoryDTO<Experience>
        {
            Success = true,
            Message = "Successfully retrieved the experience.",
            Body = experience
        };
    }

    public RepositoryDTO<List<Experience>> ReadAll()
    {
        var experiences = store.Data;
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
