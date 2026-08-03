using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface ISkillElementRepository
{
    ResponseCore<SkillElement> Create(SkillElement skillElement);

    ResponseCore<SkillElement> Read(int id);

    ResponseCore<List<SkillElement>> ReadAllForSkillGroup(int skillGroupId);

    ResponseCore<SkillElement> Update(int id, SkillElement skillElement);

    ResponseCore<SkillElement> Delete(int id);
}
