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

    public RepositoryDTO<Resume> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Resume> Read(int id)
    {
        var resume = store.Date.FirstOrDefault(c => c.Id == id);
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
        var resumes = store.Date;
        return new RepositoryDTO<List<Resume>>
        {
            Success = true,
            Message = $"Successfully retrieved {resumes.Count} resumes.",
            Body = resumes
        };
    }

    public RepositoryDTO<Resume> Update(int id, Resume resume)
    {
        throw new NotImplementedException();
    }
}
