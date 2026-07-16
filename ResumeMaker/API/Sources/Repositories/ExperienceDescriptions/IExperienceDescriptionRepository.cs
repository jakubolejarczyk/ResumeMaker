using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.ExperienceDescriptions;

public interface IExperienceDescriptionRepository
{
    RepositoryDTO<ExperienceDescription> Create(ExperienceDescription experienceDescription);

    RepositoryDTO<ExperienceDescription> Read(int id);

    RepositoryDTO<List<ExperienceDescription>> ReadAll();

    RepositoryDTO<ExperienceDescription> Update(int id, ExperienceDescription experienceDescription);

    RepositoryDTO<ExperienceDescription> Delete(int id);
}
