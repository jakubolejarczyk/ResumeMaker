using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface IResumeRepository
{
    ResponseCore<Resume> Create(Resume resume);

    ResponseCore<Resume> Read(int id);

    ResponseCore<List<Resume>> ReadAllForUser(int userId);

    ResponseCore<Resume> Update(int id, Resume resume);

    ResponseCore<Resume> Delete(int id);
}
