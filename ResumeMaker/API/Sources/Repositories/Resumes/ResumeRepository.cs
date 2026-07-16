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
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<Resume>> ReadAll()
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Resume> Update(int id, Resume resume)
    {
        throw new NotImplementedException();
    }
}
