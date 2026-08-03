using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public class SkillElementRepository(AppDbContext context) : ISkillElementRepository
{
    public ResponseCore<SkillElement> Create(SkillElement skillElement)
    {
        context.SkillElements.Add(skillElement);
        context.SaveChanges();
        return new ResponseCore<SkillElement>
        {
            Success = true,
            Message = "The skill element was created successfully.",
            Body = skillElement
        };
    }

    public ResponseCore<SkillElement> Read(int id)
    {
        var skillElement = context.SkillElements.FirstOrDefault(s => s.Id == id);
        if (skillElement == null)
        {
            return new ResponseCore<SkillElement>
            {
                Success = false,
                Message = "Failed to retrieve the skill element."
            };
        }
        return new ResponseCore<SkillElement>
        {
            Success = true,
            Message = "Successfully retrieved the skill element.",
            Body = skillElement
        };
    }

    public ResponseCore<List<SkillElement>> ReadAllForSkillGroup(int skillGroupId)
    {
        var skillElements = context.SkillElements.Where(s => s.SkillGroupId == skillGroupId).ToList();
        if (skillElements.Count > 0)
        {
            return new ResponseCore<List<SkillElement>>
            {
                Success = true,
                Message = $"Successfully retrieved {skillElements.Count} skill elements.",
                Body = skillElements
            };
        }
        return new ResponseCore<List<SkillElement>>
        {
            Success = false,
            Message = "No skill elements found."
        };
    }

    public ResponseCore<SkillElement> Update(int id, SkillElement skillElement)
    {
        var skillElementById = context.SkillElements.FirstOrDefault(s => s.Id == id);
        if (skillElementById == null)
        {
            return new ResponseCore<SkillElement>
            {
                Success = false,
                Message = "Failed to update the skill element because it does not exist."
            };
        }
        skillElementById.Name = skillElement.Name;
        skillElementById.Order = skillElement.Order;
        context.SkillElements.Update(skillElementById);
        context.SaveChanges();
        return new ResponseCore<SkillElement>
        {
            Success = true,
            Message = "Successfully updated the skill element.",
            Body = skillElementById
        };
    }

    public ResponseCore<SkillElement> Delete(int id)
    {
        var skillElement = context.SkillElements.FirstOrDefault(s => s.Id == id);
        if (skillElement == null)
        {
            return new ResponseCore<SkillElement>
            {
                Success = false,
                Message = $"Failed to delete skill element because skill element with ID {id} does not exist."
            };
        }
        context.SkillElements.Remove(skillElement);
        context.SaveChanges();
        return new ResponseCore<SkillElement>
        {
            Success = true,
            Message = $"Skill element with ID {id} has been deleted successfully.",
            Body = skillElement
        };
    }
}
