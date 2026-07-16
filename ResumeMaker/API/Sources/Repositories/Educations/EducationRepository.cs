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
        var education = store.Data.FirstOrDefault(c => c.Id == id);
        if (education == null)
        {
            return new RepositoryDTO<Education>
            {
                Success = false,
                Message = "Failed to retrieve the education."
            };
        }
        return new RepositoryDTO<Education>
        {
            Success = true,
            Message = "Successfully retrieved the education.",
            Body = education
        };
    }

    public RepositoryDTO<List<Education>> ReadAll()
    {
        var educations = store.Data;
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
