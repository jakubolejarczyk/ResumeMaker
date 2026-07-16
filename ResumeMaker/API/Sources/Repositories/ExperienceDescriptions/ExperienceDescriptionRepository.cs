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
        throw new NotImplementedException();
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
