using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.SkillGroups;

public class SkillGroupRepository(SkillGroupStore store) : ISkillGroupRepository
{
    public RepositoryDTO<SkillGroup> Create(SkillGroup skillGroup)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillGroup> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillGroup> Read(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<SkillGroup>> ReadAll()
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillGroup> Update(int id, SkillGroup skillGroup)
    {
        throw new NotImplementedException();
    }
}
