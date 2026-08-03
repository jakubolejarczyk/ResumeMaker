using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public class ExperienceDescriptionRepository(AppDbContext context) : IExperienceDescriptionRepository
{
    public ResponseCore<ExperienceDescription> Create(ExperienceDescription experienceDescription)
    {
        context.ExperienceDescriptions.Add(experienceDescription);
        context.SaveChanges();
        return new ResponseCore<ExperienceDescription>
        {
            Success = true,
            Message = "The experience description was created successfully.",
            Body = experienceDescription
        };
    }

    public ResponseCore<ExperienceDescription> Read(int id)
    {
        var experienceDescription = context.ExperienceDescriptions.FirstOrDefault(e => e.Id == id);
        if (experienceDescription == null)
        {
            return new ResponseCore<ExperienceDescription>
            {
                Success = false,
                Message = "Failed to retrieve the experience description."
            };
        }
        return new ResponseCore<ExperienceDescription>
        {
            Success = true,
            Message = "Successfully retrieved the experience description.",
            Body = experienceDescription
        };
    }

    public ResponseCore<List<ExperienceDescription>> ReadAllForExperience(int experienceId)
    {
        var experienceDescriptions = context.ExperienceDescriptions.Where(e => e.ExperienceId == experienceId).ToList();
        if (experienceDescriptions.Count > 0)
        {
            return new ResponseCore<List<ExperienceDescription>>
            {
                Success = true,
                Message = $"Successfully retrieved {experienceDescriptions.Count} experience descriptions.",
                Body = experienceDescriptions
            };
        }
        return new ResponseCore<List<ExperienceDescription>>
        {
            Success = false,
            Message = "No experience descriptions found."
        };
    }

    public ResponseCore<ExperienceDescription> Update(int id, ExperienceDescription experienceDescription)
    {
        var experienceDescriptionById = context.ExperienceDescriptions.FirstOrDefault(e => e.Id == id);
        if (experienceDescriptionById == null)
        {
            return new ResponseCore<ExperienceDescription>
            {
                Success = false,
                Message = "Failed to update the experience description because it does not exist."
            };
        }
        experienceDescriptionById.Description = experienceDescription.Description;
        experienceDescriptionById.Order = experienceDescription.Order;
        context.ExperienceDescriptions.Update(experienceDescriptionById);
        context.SaveChanges();
        return new ResponseCore<ExperienceDescription>
        {
            Success = true,
            Message = "Successfully updated the experience description.",
            Body = experienceDescriptionById
        };
    }

    public ResponseCore<ExperienceDescription> Delete(int id)
    {
        var experienceDescription = context.ExperienceDescriptions.FirstOrDefault(e => e.Id == id);
        if (experienceDescription == null)
        {
            return new ResponseCore<ExperienceDescription>
            {
                Success = false,
                Message = $"Failed to delete experience description because experience description with ID {id} does not exist."
            };
        }
        context.ExperienceDescriptions.Remove(experienceDescription);
        context.SaveChanges();
        return new ResponseCore<ExperienceDescription>
        {
            Success = true,
            Message = $"Experience description with ID {id} has been deleted successfully.",
            Body = experienceDescription
        };
    }
}
