using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.SkillGroups;

public interface ISkillGroupRepository
{
    RepositoryDTO<SkillGroup> Create(SkillGroup skillGroup);

    RepositoryDTO<SkillGroup> Read(int id);

    RepositoryDTO<List<SkillGroup>> ReadAll();

    RepositoryDTO<SkillGroup> Update(int id, SkillGroup skillGroup);

    RepositoryDTO<SkillGroup> Delete(int id);
}
