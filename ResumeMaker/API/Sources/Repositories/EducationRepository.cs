using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public class EducationRepository(AppDbContext context) : IEducationRepository
{
    public ResponseCore<Education> Create(Education education)
    {
        context.Educations.Add(education);
        context.SaveChanges();
        return new ResponseCore<Education>
        {
            Success = true,
            Message = "The education was created successfully.",
            Body = education
        };
    }

    public ResponseCore<Education> Read(int id)
    {
        var education = context.Educations.FirstOrDefault(e => e.Id == id);
        if (education == null)
        {
            return new ResponseCore<Education>
            {
                Success = false,
                Message = "Failed to retrieve the education."
            };
        }
        return new ResponseCore<Education>
        {
            Success = true,
            Message = "Successfully retrieved the education.",
            Body = education
        };
    }

    public ResponseCore<List<Education>> ReadAllForResume(int resumeId)
    {
        var educations = context.Educations.Where(e => e.ResumeId == resumeId).ToList();
        if (educations.Count > 0)
        {
            return new ResponseCore<List<Education>>
            {
                Success = true,
                Message = $"Successfully retrieved {educations.Count} educations.",
                Body = educations
            };
        }
        return new ResponseCore<List<Education>>
        {
            Success = false,
            Message = "No educations found."
        };
    }

    public ResponseCore<Education> Update(int id, Education education)
    {
        var educationById = context.Educations.FirstOrDefault(e => e.Id == id);
        if (educationById == null)
        {
            return new ResponseCore<Education>
            {
                Success = false,
                Message = "Failed to update the education because it does not exist."
            };
        }
        educationById.InstitutionName = education.InstitutionName;
        educationById.FieldOfStudy = education.FieldOfStudy;
        educationById.Degree = education.Degree;
        educationById.GraduationYear = education.GraduationYear;
        educationById.Order = education.Order;
        context.Educations.Update(educationById);
        context.SaveChanges();
        return new ResponseCore<Education>
        {
            Success = true,
            Message = "Successfully updated the education.",
            Body = educationById
        };
    }

    public ResponseCore<Education> Delete(int id)
    {
        var education = context.Educations.FirstOrDefault(e => e.Id == id);
        if (education == null)
        {
            return new ResponseCore<Education>
            {
                Success = false,
                Message = $"Failed to delete education because education with ID {id} does not exist."
            };
        }
        context.Educations.Remove(education);
        context.SaveChanges();
        return new ResponseCore<Education>
        {
            Success = true,
            Message = $"Education with ID {id} has been deleted successfully.",
            Body = education
        };
    }
}
