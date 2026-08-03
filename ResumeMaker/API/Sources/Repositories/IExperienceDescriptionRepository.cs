using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface IExperienceDescriptionRepository
{
    ResponseCore<ExperienceDescription> Create(ExperienceDescription experienceDescription);

    ResponseCore<ExperienceDescription> Read(int id);

    ResponseCore<List<ExperienceDescription>> ReadAllForExperience(int experienceId);

    ResponseCore<ExperienceDescription> Update(int id, ExperienceDescription experienceDescription);

    ResponseCore<ExperienceDescription> Delete(int id);
}
