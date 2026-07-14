using ResumeMakerApi.Source.Contexts;
using ResumeMakerApi.Source.Dtos;
using ResumeMakerApi.Source.Models;

namespace ResumeMakerApi.Source.Repositories;

public class ResumeRepository(AppDbContext context)
{
    public ResumeDto? GetResumeDto(int resumeId, int userId, int companyId)
    {
        var user = context.Users.FirstOrDefault(u => u.Id == userId);
        var company = context.Companies.FirstOrDefault(c => c.Id == companyId);
        var resume = context.Resumes.FirstOrDefault(r => r.Id == resumeId);
        var socialMedias = context.SocialMedias.Where(s => s.ResumeId == resumeId).Select(s => new SocialMediaModel
        {
            Label = s.Label,
            Link = s.Link
        }).ToList();
        var educations = context.Educations.Where(e => e.ResumeId == resumeId).Select(e => new EducationModel
        {
            InstitutionName = e.InstitutionName,
            FieldOfStudy = e.FieldOfStudy,
            Degree = e.Degree,
            GraduationYear = e.GraduationYear,
        }).ToList();
        var experiences = context.Experiences.Where(ex => ex.ResumeId == resumeId).Select(ex => new ExperienceModel
        {
            CompanyName = ex.CompanyName,
            JobTitle = ex.JobTitle,
            StartDate = ex.StartDate,
            EndDate = ex.EndDate,
            ExperienceDescriptions = context.ExperienceDescriptions.Where(ed => ed.ExperienceId == ex.Id).Select(ed => new ExperienceDescriptionModel
            {
                Description = ed.Description
            }).ToList()
        }).ToList();
        var skillGroups = context.SkillGroups.Where(sg => sg.ResumeId == resumeId).OrderBy(sg => sg.Order).Select(sg => new SkillGroupModel
        {
            Title = sg.Title,
            SkillElements = context.SkillElements.Where(sk => sk.SkillGroupId == sg.Id).Select(sk => new SkillElementModel
            {
                Name = sk.Name,
            }).ToList()
        }).ToList();
        if (user == null || company == null || resume == null || socialMedias == null || educations == null || experiences == null || skillGroups == null) return null;
        return new ResumeDto
        {
            User = new UserModel
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                CountryCode = user.CountryCode,
                PhoneNumber = user.PhoneNumber
            },
            Company = new CompanyModel
            {
                Name = company.Name,
                City = company.City,
                Country = company.Country,
                IncludePrivacyConsentClause = company.IncludePrivacyConsentClause
            },
            Resume = new ResumeModel
            {
                Title = resume.Title,
                JobTitle = resume.JobTitle,
                Language = resume.Language,
                City = resume.City,
                Country = resume.Country
            },
            SocialMedias = socialMedias,
            Educations = educations,
            Experiences = experiences,
            SkillGroups = skillGroups
        };
    }
}
