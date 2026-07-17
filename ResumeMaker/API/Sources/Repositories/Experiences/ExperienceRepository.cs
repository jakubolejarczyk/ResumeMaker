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

    public RepositoryDTO<Experience> Read(int id)
    {
        var experience = store.Data.FirstOrDefault(e => e.Id == id);
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
        var currentExperience = store.Data.FirstOrDefault(e => e.Id == id);
        if (currentExperience == null)
        {
            return new RepositoryDTO<Experience>
            {
                Success = false,
                Message = "Failed to update the experience because it does not exist."
            };
        }
        if (currentExperience.Id != experience.Id)
        {
            return new RepositoryDTO<Experience>
            {
                Success = false,
                Message = "Failed to update the experience due to an internal error."
            };
        }
        currentExperience.CompanyName = experience.CompanyName;
        currentExperience.JobTitle = experience.JobTitle;
        currentExperience.StartDate = experience.StartDate;
        currentExperience.EndDate = experience.EndDate;
        store.Data = store.Data.Select(e => e.Id == id ? currentExperience : e).ToList();
        return new RepositoryDTO<Experience>
        {
            Success = true,
            Message = "Successfully updated the experience.",
            Body = currentExperience
        };
    }

    public RepositoryDTO<Experience> Delete(int id)
    {
        var experience = store.Data.FirstOrDefault(e => e.Id == id);
        if (experience == null)
        {
            return new RepositoryDTO<Experience>
            {
                Success = false,
                Message = "Failed to delete the experience because it does not exist."
            };
        }
        store.Data.Remove(experience);
        return new RepositoryDTO<Experience>
        {
            Success = true,
            Message = "Successfully deleted the experience.",
            Body = experience
        };
    }
}
