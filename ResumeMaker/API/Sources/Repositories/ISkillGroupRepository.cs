using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface ISkillGroupRepository
{
    ResponseCore<SkillGroup> Create(SkillGroup skillGroup);

    ResponseCore<SkillGroup> Read(int id);

    ResponseCore<List<SkillGroup>> ReadAllForResume(int resumeId);

    ResponseCore<SkillGroup> Update(int id, SkillGroup skillGroup);

    ResponseCore<SkillGroup> Delete(int id);
}
