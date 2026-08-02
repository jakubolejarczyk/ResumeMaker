using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface IExperienceRepository
{
    ResponseCore<Experience> Create(Experience experience);

    ResponseCore<Experience> Read(int id);

    ResponseCore<List<Experience>> ReadAllForResume(int resumeId);

    ResponseCore<Experience> Update(int id, Experience experience);

    ResponseCore<Experience> Delete(int id);
}
