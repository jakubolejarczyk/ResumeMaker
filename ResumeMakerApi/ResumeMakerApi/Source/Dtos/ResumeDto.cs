using ResumeMakerApi.Source.Models;

namespace ResumeMakerApi.Source.Dtos;

public class ResumeDto
{
    public required UserModel User { get; set; }

    public required CompanyModel Company { get; set; }

    public required ResumeModel Resume { get; set; }

    public required List<SocialMediaModel> SocialMedias { get; set; }

    public required List<EducationModel> Educations { get; set; }

    public required List<ExperienceModel> Experiences { get; set; }

    public required List<SkillGroupModel> SkillGroups { get; set; }
}
