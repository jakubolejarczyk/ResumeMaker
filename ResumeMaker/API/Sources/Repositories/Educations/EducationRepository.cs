using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.Educations;

public class EducationRepository(EducationStore store) : IEducationRepository
{
    public RepositoryDTO<Education> Create(Education education)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Education> Read(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<Education>> ReadAll()
    {
        var educations = store.Date;
        return new RepositoryDTO<List<Education>>
        {
            Success = true,
            Message = $"Successfully retrieved {educations.Count} educations.",
            Body = educations
        };
    }

    public RepositoryDTO<Education> Update(int id, Education education)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<Education> Delete(int id)
    {
        throw new NotImplementedException();
    }
}
