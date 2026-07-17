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

    public RepositoryDTO<SkillGroup> Read(int id)
    {
        var skillGroup = store.Data.FirstOrDefault(c => c.Id == id);
        if (skillGroup == null)
        {
            return new RepositoryDTO<SkillGroup>
            {
                Success = false,
                Message = "Failed to retrieve the skill group."
            };
        }
        return new RepositoryDTO<SkillGroup>
        {
            Success = true,
            Message = "Successfully retrieved the skill group.",
            Body = skillGroup
        };
    }

    public RepositoryDTO<List<SkillGroup>> ReadAll()
    {
        var skillGroups = store.Data;
        return new RepositoryDTO<List<SkillGroup>>
        {
            Success = true,
            Message = $"Successfully retrieved {skillGroups.Count} skill groups.",
            Body = skillGroups
        };
    }

    public RepositoryDTO<SkillGroup> Update(int id, SkillGroup skillGroup)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillGroup> Delete(int id)
    {
        var skillGroup = store.Data.FirstOrDefault(c => c.Id == id);
        if (skillGroup == null)
        {
            return new RepositoryDTO<SkillGroup>
            {
                Success = false,
                Message = "Failed to delete the skill group because it does not exist."
            };
        }
        store.Data.Remove(skillGroup);
        return new RepositoryDTO<SkillGroup>
        {
            Success = true,
            Message = "Successfully deleted the skill group.",
            Body = skillGroup
        };
    }
}
