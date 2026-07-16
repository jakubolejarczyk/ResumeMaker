using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.SkillElements;

public class SkillElementRepository(SkillElementStore store) : ISkillElementRepository
{
    public RepositoryDTO<SkillElement> Create(SkillElement skillElement)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillElement> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillElement> Read(int id)
    {
        var skillElement = store.Date.FirstOrDefault(c => c.Id == id);
        if (skillElement == null)
        {
            return new RepositoryDTO<SkillElement>
            {
                Success = false,
                Message = "Failed to retrieve the skill element."
            };
        }
        return new RepositoryDTO<SkillElement>
        {
            Success = true,
            Message = "Successfully retrieved the skill element.",
            Body = skillElement
        };
    }

    public RepositoryDTO<List<SkillElement>> ReadAll()
    {
        var skillElements = store.Date;
        return new RepositoryDTO<List<SkillElement>>
        {
            Success = true,
            Message = $"Successfully retrieved {skillElements.Count} skill elements.",
            Body = skillElements
        };
    }

    public RepositoryDTO<SkillElement> Update(int id, SkillElement skillElement)
    {
        throw new NotImplementedException();
    }
}
