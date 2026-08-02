using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface IEducationRepository
{
    ResponseCore<Education> Create(Education education);

    ResponseCore<Education> Read(int id);

    ResponseCore<List<Education>> ReadAllForResume(int resumeId);

    ResponseCore<Education> Update(int id, Education education);

    ResponseCore<Education> Delete(int id);
}
