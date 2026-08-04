namespace API.Sources.Requests;

public class ResumeRequest
{
    public required string Name { get; set; }

    public required string JobTitle { get; set; }

    public required string Description { get; set; }

    public required int UserId { get; set; }

    public required List<SocialMediaRequest> SocialMedias { get; set; }

    public required List<EducationRequest> Educations { get; set; }

    public required List<ExperienceRequest> Experiences { get; set; }

    public required List<SkillGroupRequest> SkillGroups { get; set; }

    public class SocialMediaRequest
    {
        public int Id { get; set; }

        public required string Label { get; set; }

        public required string Link { get; set; }

        public required int Order { get; set; }

        public required int ResumeId { get; set; }

        public string Operation { get; set; } = string.Empty;
    }

    public class EducationRequest
    {
        public int Id { get; set; }

        public required string InstitutionName { get; set; }

        public required string FieldOfStudy { get; set; }

        public required string Degree { get; set; }

        public required int GraduationYear { get; set; }

        public required int ResumeId { get; set; }

        public string Operation { get; set; } = string.Empty;
    }

    public class ExperienceRequest
    {
        public int Id { get; set; }

        public required string CompanyName { get; set; }

        public required string JobTitle { get; set; }

        public required DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public required int ResumeId { get; set; }

        public string Operation { get; set; } = string.Empty;

        public required List<ExperienceDescriptionRequest> ExperienceDescriptions { get; set; }

        public class ExperienceDescriptionRequest
        {
            public int Id { get; set; }

            public required string Description { get; set; }

            public required int Order { get; set; }

            public required int ExperienceId { get; set; }

            public string Operation { get; set; } = string.Empty;
        }
    }

    public class SkillGroupRequest
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required int Order { get; set; }

        public required int ResumeId { get; set; }

        public string Operation { get; set; } = string.Empty;

        public required List<SkillElementRequest> SkillElements { get; set; }

        public class SkillElementRequest
        {
            public int Id { get; set; }

            public required string Name { get; set; }

            public required int Order { get; set; }

            public required int SkillGroupId { get; set; }

            public string Operation { get; set; } = string.Empty;
        }
    }
}
