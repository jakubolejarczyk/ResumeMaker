using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.SkillElements;

public class SkillElementRepository(SkillElementStore store) : ISkillElementRepository
{
    public RepositoryDTO<SkillElement> Create(SkillElement skillElement)
    {
        skillElement.Id = store.Data.Count;
        store.Data.Add(skillElement);
        return new RepositoryDTO<SkillElement>
        {
            Success = true,
            Message = "The skill element was created successfully.",
            Body = skillElement
        };
    }

    public RepositoryDTO<SkillElement> Read(int id)
    {
        var skillElement = store.Data.FirstOrDefault(s => s.Id == id);
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
        var skillElements = store.Data;
        return new RepositoryDTO<List<SkillElement>>
        {
            Success = true,
            Message = $"Successfully retrieved {skillElements.Count} skill elements.",
            Body = skillElements
        };
    }

    public RepositoryDTO<SkillElement> Update(int id, SkillElement skillElement)
    {
        var currentSkillElement = store.Data.FirstOrDefault(s => s.Id == id);
        if (currentSkillElement == null)
        {
            return new RepositoryDTO<SkillElement>
            {
                Success = false,
                Message = "Failed to update the skill element because it does not exist."
            };
        }
        if (currentSkillElement.Id != skillElement.Id)
        {
            return new RepositoryDTO<SkillElement>
            {
                Success = false,
                Message = "Failed to update the skill element due to an internal error."
            };
        }
        currentSkillElement.Name = skillElement.Name;
        currentSkillElement.Order = skillElement.Order;
        store.Data = store.Data.Select(s => s.Id == id ? currentSkillElement : s).ToList();
        return new RepositoryDTO<SkillElement>
        {
            Success = true,
            Message = "Successfully updated the skill element.",
            Body = currentSkillElement
        };
    }

    public RepositoryDTO<SkillElement> Delete(int id)
    {
        var skillElement = store.Data.FirstOrDefault(s => s.Id == id);
        if (skillElement == null)
        {
            return new RepositoryDTO<SkillElement>
            {
                Success = false,
                Message = "Failed to delete the skill element because it does not exist."
            };
        }
        store.Data.Remove(skillElement);
        return new RepositoryDTO<SkillElement>
        {
            Success = true,
            Message = "Successfully deleted the skill element.",
            Body = skillElement
        };
    }
}
