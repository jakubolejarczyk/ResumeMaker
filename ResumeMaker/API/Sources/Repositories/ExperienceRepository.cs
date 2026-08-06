using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public class ExperienceRepository(AppDbContext context) : IExperienceRepository
{
    public ResponseCore<Experience> Create(Experience experience)
    {
        context.Experiences.Add(experience);
        context.SaveChanges();
        return new ResponseCore<Experience>
        {
            Success = true,
            Message = "The experience was created successfully.",
            Body = experience
        };
    }

    public ResponseCore<Experience> Read(int id)
    {
        var experience = context.Experiences.FirstOrDefault(e => e.Id == id);
        if (experience == null)
        {
            return new ResponseCore<Experience>
            {
                Success = false,
                Message = "Failed to retrieve the experience."
            };
        }
        return new ResponseCore<Experience>
        {
            Success = true,
            Message = "Successfully retrieved the experience.",
            Body = experience
        };
    }

    public ResponseCore<List<Experience>> ReadAllForResume(int resumeId)
    {
        var experiences = context.Experiences.Where(e => e.ResumeId == resumeId).ToList();
        if (experiences.Count > 0)
        {
            return new ResponseCore<List<Experience>>
            {
                Success = true,
                Message = $"Successfully retrieved {experiences.Count} experiences.",
                Body = experiences
            };
        }
        return new ResponseCore<List<Experience>>
        {
            Success = false,
            Message = "No experiences found."
        };
    }

    public ResponseCore<Experience> Update(int id, Experience experience)
    {
        var experienceById = context.Experiences.FirstOrDefault(e => e.Id == id);
        if (experienceById == null)
        {
            return new ResponseCore<Experience>
            {
                Success = false,
                Message = "Failed to update the experience because it does not exist."
            };
        }
        experienceById.CompanyName = experience.CompanyName;
        experienceById.JobTitle = experience.JobTitle;
        experienceById.StartDate = experience.StartDate;
        experienceById.EndDate = experience.EndDate;
        experienceById.Order = experience.Order;
        context.Experiences.Update(experienceById);
        context.SaveChanges();
        return new ResponseCore<Experience>
        {
            Success = true,
            Message = "Successfully updated the experience.",
            Body = experienceById
        };
    }

    public ResponseCore<Experience> Delete(int id)
    {
        var experience = context.Experiences.FirstOrDefault(e => e.Id == id);
        if (experience == null)
        {
            return new ResponseCore<Experience>
            {
                Success = false,
                Message = $"Failed to delete experience because experience with ID {id} does not exist."
            };
        }
        context.Experiences.Remove(experience);
        context.SaveChanges();
        return new ResponseCore<Experience>
        {
            Success = true,
            Message = $"Experience with ID {id} has been deleted successfully.",
            Body = experience
        };
    }
}
