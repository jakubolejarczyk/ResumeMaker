using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.ExperienceDescriptions;

public class ExperienceDescriptionRepository(ExperienceDescriptionStore store) : IExperienceDescriptionRepository
{
    public RepositoryDTO<ExperienceDescription> Create(ExperienceDescription experienceDescription)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<ExperienceDescription> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<ExperienceDescription> Read(int id)
    {
        var experienceDescription = store.Date.FirstOrDefault(c => c.Id == id);
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
        var educationDescriptions = store.Date;
        return new RepositoryDTO<List<ExperienceDescription>>
        {
            Success = true,
            Message = $"Successfully retrieved {educationDescriptions.Count} education descriptions.",
            Body = educationDescriptions
        };
    }

    public RepositoryDTO<ExperienceDescription> Update(int id, ExperienceDescription experienceDescription)
    {
        throw new NotImplementedException();
    }
}
