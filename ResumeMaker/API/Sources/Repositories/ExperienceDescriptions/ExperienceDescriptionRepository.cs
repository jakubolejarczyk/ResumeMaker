using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.ExperienceDescriptions;

public class ExperienceDescriptionRepository(ExperienceDescriptionStore store) : IExperienceDescriptionRepository
{
    public RepositoryDTO<ExperienceDescription> Create(ExperienceDescription experienceDescription)
    {
        experienceDescription.Id = store.Data.Count;
        store.Data.Add(experienceDescription);
        return new RepositoryDTO<ExperienceDescription>
        {
            Success = true,
            Message = "The experience description was created successfully.",
            Body = experienceDescription
        };
    }

    public RepositoryDTO<ExperienceDescription> Read(int id)
    {
        var experienceDescription = store.Data.FirstOrDefault(e => e.Id == id);
        if (experienceDescription == null)
        {
            return new RepositoryDTO<ExperienceDescription>
            {
                Success = false,
                Message = "Failed to retrieve the experience description."
            };
        }
        return new RepositoryDTO<ExperienceDescription>
        {
            Success = true,
            Message = "Successfully retrieved the experience description.",
            Body = experienceDescription
        };
    }

    public RepositoryDTO<List<ExperienceDescription>> ReadAll()
    {
        var educationDescriptions = store.Data;
        return new RepositoryDTO<List<ExperienceDescription>>
        {
            Success = true,
            Message = $"Successfully retrieved {educationDescriptions.Count} education descriptions.",
            Body = educationDescriptions
        };
    }

    public RepositoryDTO<ExperienceDescription> Update(int id, ExperienceDescription experienceDescription)
    {
        var currentExperienceDescription = store.Data.FirstOrDefault(e => e.Id == id);
        if (currentExperienceDescription == null)
        {
            return new RepositoryDTO<ExperienceDescription>
            {
                Success = false,
                Message = "Failed to update the experience description because it does not exist."
            };
        }
        if (currentExperienceDescription.Id != experienceDescription.Id)
        {
            return new RepositoryDTO<ExperienceDescription>
            {
                Success = false,
                Message = "Failed to update the experience description due to an internal error."
            };
        }
        currentExperienceDescription.Description = experienceDescription.Description;
        currentExperienceDescription.Order = experienceDescription.Order;
        store.Data = store.Data.Select(e => e.Id == id ? currentExperienceDescription : e).ToList();
        return new RepositoryDTO<ExperienceDescription>
        {
            Success = true,
            Message = "Successfully updated the experience description.",
            Body = currentExperienceDescription
        };
    }

    public RepositoryDTO<ExperienceDescription> Delete(int id)
    {
        var experienceDescription = store.Data.FirstOrDefault(c => c.Id == id);
        if (experienceDescription == null)
        {
            return new RepositoryDTO<ExperienceDescription>
            {
                Success = false,
                Message = "Failed to delete the experience description because it does not exist."
            };
        }
        store.Data.Remove(experienceDescription);
        return new RepositoryDTO<ExperienceDescription>
        {
            Success = true,
            Message = "Successfully deleted the experience description.",
            Body = experienceDescription
        };
    }
}
