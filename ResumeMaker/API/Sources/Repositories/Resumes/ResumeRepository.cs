//using API.Sources.Contexts;
//using API.Sources.DTOs;
//using API.Sources.Entities;
//using API.Sources.Stores;

//namespace API.Sources.Repositories.Resumes;

//public class ResumeRepository(AppDbContext appDbContext, ResumeStore store) : IResumeRepository
//{
//    public RepositoryDTO<Resume> Create(Resume resume)
//    {
//        var nameExists = appDbContext.Resumes.FirstOrDefault(r => r.Name == resume.Name);
//        if (nameExists != null)
//        {
//            return new RepositoryDTO<Resume>
//            {
//                Success = false,
//                Message = "The resume name is already taken."
//            };
//        }
//        appDbContext.Resumes.Add(resume);
//        appDbContext.SaveChanges();
//        return new RepositoryDTO<Resume>
//        {
//            Success = true,
//            Message = "The resume was created successfully.",
//            Body = resume
//        };
//    }

//    public RepositoryDTO<Resume> Read(int id)
//    {
//        var resume = appDbContext.Resumes.FirstOrDefault(r => r.Id == id);
//        if (resume == null)
//        {
//            return new RepositoryDTO<Resume>
//            {
//                Success = false,
//                Message = "Failed to retrieve the resume."
//            };
//        }
//        var socialMedias = appDbContext.SocialMedias.Where(s => s.ResumeId == resume.Id).ToList();
//        resume.SocialMedias = socialMedias;
//        var educations = appDbContext.Educations.Where(e => e.ResumeId == resume.Id).ToList();
//        resume.Educations = educations;
//        var experiences = appDbContext.Experiences
//            .Where(e => e.ResumeId == resume.Id)
//            .ToList()
//            .Select(e =>
//            {
//                var experienceDescription = appDbContext.ExperienceDescriptions
//                    .Where(ee => ee.ExperienceId == e.Id)
//                    .ToList();
//                e.ExperienceDescriptions = experienceDescription;
//                return e;
//            })
//            .ToList();
//        resume.Experiences = experiences;
//        var skillGroups = appDbContext.SkillGroups
//            .Where(e => e.ResumeId == resume.Id)
//            .ToList()
//            .Select(e =>
//            {
//                var skillElements = appDbContext.SkillElements
//                    .Where(ee => ee.SkillGroupId == e.Id)
//                    .ToList();
//                e.SkillElements = skillElements;
//                return e;
//            })
//            .ToList();
//        resume.SkillGroups = skillGroups;
//        return new RepositoryDTO<Resume>
//        {
//            Success = true,
//            Message = "Successfully retrieved the resume.",
//            Body = resume
//        };
//    }

//    public RepositoryDTO<List<Resume>> ReadAllByUserId(int userId)
//    {
//        var resumes = appDbContext.Resumes.Where(c => c.UserId == userId).ToList();
//        return new RepositoryDTO<List<Resume>>
//        {
//            Success = true,
//            Message = $"Successfully retrieved {resumes.Count} resumes.",
//            Body = resumes
//        };
//    }

//    public RepositoryDTO<Resume> Update(int id, Resume resume)
//    {
//        var currentResume = appDbContext.Resumes.FirstOrDefault(r => r.Id == id);
//        if (currentResume == null)
//        {
//            return new RepositoryDTO<Resume>
//            {
//                Success = false,
//                Message = "Failed to update the resume because it does not exist."
//            };
//        }
//        if (currentResume.Id != resume.Id)
//        {
//            return new RepositoryDTO<Resume>
//            {
//                Success = false,
//                Message = "Failed to update the resume due to an internal error."
//            };
//        }
//        var nameExists = appDbContext.Resumes.FirstOrDefault(r => r.Name == resume.Name);
//        if (nameExists != null)
//        {
//            return new RepositoryDTO<Resume>
//            {
//                Success = false,
//                Message = "The resume name is already taken."
//            };
//        }
//        currentResume.Name = resume.Name;
//        currentResume.JobTitle = resume.JobTitle;
//        currentResume.Description = resume.Description;
//        appDbContext.Resumes.Update(currentResume);
//        appDbContext.SaveChanges();
//        return new RepositoryDTO<Resume>
//        {
//            Success = true,
//            Message = "Successfully updated the resume.",
//            Body = currentResume
//        };
//    }

//    public RepositoryDTO<Resume> Delete(int id)
//    {
//        var resume = appDbContext.Resumes.FirstOrDefault(r => r.Id == id);
//        if (resume == null)
//        {
//            return new RepositoryDTO<Resume>
//            {
//                Success = false,
//                Message = "Failed to delete the resume because it does not exist."
//            };
//        }
//        appDbContext.Resumes.Remove(resume);
//        appDbContext.SaveChanges();
//        return new RepositoryDTO<Resume>
//        {
//            Success = true,
//            Message = "Successfully deleted the resume.",
//            Body = resume
//        };
//    }
//}
