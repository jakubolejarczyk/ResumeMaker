using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.Resumes;

public interface IResumeRepository
{
    RepositoryDTO<Resume> Create(Resume resume);

    RepositoryDTO<Resume> Read(int id);

    RepositoryDTO<List<Resume>> ReadAll();

    RepositoryDTO<Resume> Update(int id, Resume resume);

    RepositoryDTO<Resume> Delete(int id);
}
