using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.Resumes;

public class ResumeRepository(ResumeStore store) : IResumeRepository
{
    public RepositoryDTO<Resume> Create(Resume resume)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Resume> Read(int id)
    {
        var resume = store.Data.FirstOrDefault(r => r.Id == id);
        if (resume == null)
        {
            return new RepositoryDTO<Resume>
            {
                Success = false,
                Message = "Failed to retrieve the resume."
            };
        }
        return new RepositoryDTO<Resume>
        {
            Success = true,
            Message = "Successfully retrieved the resume.",
            Body = resume
        };
    }

    public RepositoryDTO<List<Resume>> ReadAll()
    {
        var resumes = store.Data;
        return new RepositoryDTO<List<Resume>>
        {
            Success = true,
            Message = $"Successfully retrieved {resumes.Count} resumes.",
            Body = resumes
        };
    }

    public RepositoryDTO<Resume> Update(int id, Resume resume)
    {
        var currentResume = store.Data.FirstOrDefault(r => r.Id == id);
        if (currentResume == null)
        {
            return new RepositoryDTO<Resume>
            {
                Success = false,
                Message = "Failed to update the resume because it does not exist."
            };
        }
        if (currentResume.Id != resume.Id)
        {
            return new RepositoryDTO<Resume>
            {
                Success = false,
                Message = "Failed to update the resume due to an internal error."
            };
        }
        var nameExists = store.Data.FirstOrDefault(r => r.Name == resume.Name);
        if (nameExists != null)
        {
            return new RepositoryDTO<Resume>
            {
                Success = false,
                Message = "The resume name is already taken."
            };
        }
        currentResume.Name = resume.Name;
        currentResume.JobTitle = resume.JobTitle;
        currentResume.Description = resume.Description;
        store.Data = store.Data.Select(r => r.Id == id ? currentResume : r).ToList();
        return new RepositoryDTO<Resume>
        {
            Success = true,
            Message = "Successfully updated the resume.",
            Body = currentResume
        };
    }

    public RepositoryDTO<Resume> Delete(int id)
    {
        var resume = store.Data.FirstOrDefault(r => r.Id == id);
        if (resume == null)
        {
            return new RepositoryDTO<Resume>
            {
                Success = false,
                Message = "Failed to delete the resume because it does not exist."
            };
        }
        store.Data.Remove(resume);
        return new RepositoryDTO<Resume>
        {
            Success = true,
            Message = "Successfully deleted the resume.",
            Body = resume
        };
    }
}
