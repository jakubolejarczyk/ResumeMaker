using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public class SkillGroupRepository(AppDbContext context) : ISkillGroupRepository
{
    public ResponseCore<SkillGroup> Create(SkillGroup skillGroup)
    {
        context.SkillGroups.Add(skillGroup);
        context.SaveChanges();
        return new ResponseCore<SkillGroup>
        {
            Success = true,
            Message = "The skill group was created successfully.",
            Body = skillGroup
        };
    }

    public ResponseCore<SkillGroup> Read(int id)
    {
        var skillGroup = context.SkillGroups.FirstOrDefault(s => s.Id == id);
        if (skillGroup == null)
        {
            return new ResponseCore<SkillGroup>
            {
                Success = false,
                Message = "Failed to retrieve the skill group."
            };
        }
        return new ResponseCore<SkillGroup>
        {
            Success = true,
            Message = "Successfully retrieved the skill group.",
            Body = skillGroup
        };
    }

    public ResponseCore<List<SkillGroup>> ReadAllForResume(int resumeId)
    {
        var skillGroups = context.SkillGroups.Where(s => s.ResumeId == resumeId).ToList();
        if (skillGroups.Count > 0)
        {
            return new ResponseCore<List<SkillGroup>>
            {
                Success = true,
                Message = $"Successfully retrieved {skillGroups.Count} skill groups.",
                Body = skillGroups
            };
        }
        return new ResponseCore<List<SkillGroup>>
        {
            Success = false,
            Message = "No skill groups found."
        };
    }

    public ResponseCore<SkillGroup> Update(int id, SkillGroup skillGroup)
    {
        var skillGroupById = context.SkillGroups.FirstOrDefault(s => s.Id == id);
        if (skillGroupById == null)
        {
            return new ResponseCore<SkillGroup>
            {
                Success = false,
                Message = "Failed to update the skill group because it does not exist."
            };
        }
        skillGroupById.Name = skillGroup.Name;
        skillGroupById.Order = skillGroup.Order;
        context.SkillGroups.Update(skillGroupById);
        context.SaveChanges();
        return new ResponseCore<SkillGroup>
        {
            Success = true,
            Message = "Successfully updated the skill group.",
            Body = skillGroupById
        };
    }

    public ResponseCore<SkillGroup> Delete(int id)
    {
        var skillGroup = context.SkillGroups.FirstOrDefault(s => s.Id == id);
        if (skillGroup == null)
        {
            return new ResponseCore<SkillGroup>
            {
                Success = false,
                Message = $"Failed to delete skill group because skill group with ID {id} does not exist."
            };
        }
        context.SkillGroups.Remove(skillGroup);
        context.SaveChanges();
        return new ResponseCore<SkillGroup>
        {
            Success = true,
            Message = $"Skill group with ID {id} has been deleted successfully.",
            Body = skillGroup
        };
    }
}
