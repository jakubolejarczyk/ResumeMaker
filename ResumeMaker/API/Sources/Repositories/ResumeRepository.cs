using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Sources.Repositories;

public class ResumeRepository(AppDbContext context) : IResumeRepository
{
    public ResponseCore<Resume> Create(Resume resume)
    {
        context.Resumes.Add(resume);
        context.SaveChanges();
        return new ResponseCore<Resume>
        {
            Success = true,
            Message = "The resume was created successfully.",
            Body = resume
        };
    }

    public ResponseCore<Resume> Read(int id)
    {
        var resume = context.Resumes
            .Include(r => r.SocialMedias)
            .Include(r => r.Educations)
            .Include(r => r.Experiences)
                .ThenInclude(e => e.ExperienceDescriptions)
            .Include(r => r.SkillGroups)
                .ThenInclude(sg => sg.SkillElements)
            .FirstOrDefault(r => r.Id == id);
        if (resume == null)
        {
            return new ResponseCore<Resume>
            {
                Success = false,
                Message = "Failed to retrieve the resume."
            };
        }
        return new ResponseCore<Resume>
        {
            Success = true,
            Message = "Successfully retrieved the resume.",
            Body = resume
        };
    }

    public ResponseCore<List<Resume>> ReadAllForUser(int userId)
    {
        var resumes = context.Resumes.Where(r => r.UserId == userId).ToList();
        if (resumes.Count > 0)
        {
            return new ResponseCore<List<Resume>>
            {
                Success = true,
                Message = $"Successfully retrieved {resumes.Count} resumes.",
                Body = resumes
            };
        }
        return new ResponseCore<List<Resume>>
        {
            Success = false,
            Message = "No resumes found."
        };
    }

    public ResponseCore<Resume> Update(int id, Resume resume)
    {
        var resumeById = context.Resumes.FirstOrDefault(r => r.Id == id);
        if (resumeById == null)
        {
            return new ResponseCore<Resume>
            {
                Success = false,
                Message = "Failed to update the resume because it does not exist."
            };
        }
        resumeById.Name = resume.Name;
        resumeById.JobTitle = resume.JobTitle;
        resumeById.Description = resume.Description;
        context.Resumes.Update(resumeById);
        context.SaveChanges();
        return new ResponseCore<Resume>
        {
            Success = true,
            Message = "Successfully updated the resume.",
            Body = resumeById
        };
    }

    public ResponseCore<Resume> Delete(int id)
    {
        var resume = context.Resumes.FirstOrDefault(r => r.Id == id);
        if (resume == null)
        {
            return new ResponseCore<Resume>
            {
                Success = false,
                Message = $"Failed to delete resume because resume with ID {id} does not exist."
            };
        }
        context.Resumes.Remove(resume);
        context.SaveChanges();
        return new ResponseCore<Resume>
        {
            Success = true,
            Message = $"Resume with ID {id} has been deleted successfully.",
            Body = resume
        };
    }
}
