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
        var education = store.Data.FirstOrDefault(e => e.Id == id);
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
        var currentEducation = store.Data.FirstOrDefault(e => e.Id == id);
        if (currentEducation == null)
        {
            return new RepositoryDTO<Education>
            {
                Success = false,
                Message = "Failed to update the education because it does not exist."
            };
        }
        if (currentEducation.Id != education.Id)
        {
            return new RepositoryDTO<Education>
            {
                Success = false,
                Message = "Failed to update the education due to an internal error."
            };
        }
        currentEducation.InstitutionName = education.InstitutionName;
        currentEducation.FieldOfStudy = education.FieldOfStudy;
        currentEducation.Degree = education.Degree;
        currentEducation.GraduationYear = education.GraduationYear;
        store.Data = store.Data.Select(e => e.Id == id ? currentEducation : e).ToList();
        return new RepositoryDTO<Education>
        {
            Success = true,
            Message = "Successfully updated the education.",
            Body = currentEducation
        };
    }

    public RepositoryDTO<Education> Delete(int id)
    {
        var education = store.Data.FirstOrDefault(e => e.Id == id);
        if (education == null)
        {
            return new RepositoryDTO<Education>
            {
                Success = false,
                Message = "Failed to delete the education because it does not exist."
            };
        }
        store.Data.Remove(education);
        return new RepositoryDTO<Education>
        {
            Success = true,
            Message = "Successfully deleted the education.",
            Body = education
        };
    }
}
