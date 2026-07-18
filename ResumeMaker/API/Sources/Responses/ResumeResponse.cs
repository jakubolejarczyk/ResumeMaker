namespace API.Sources.Requests;

public class ResumeResponse
{
    public required string Name { get; set; }

    public required string JobTitle { get; set; }

    public required string Description { get; set; }

    public required int UserId { get; set; }

    public required List<SocialMediaRequest> SocialMedias { get; set; }

    public required List<EducationRequest> Educations { get; set; }

    public required List<ExperienceRequest> ExperienceRequests { get; set; }

    public required List<SkillGroup> SkillGroups { get; set; }

    public class SocialMediaRequest
    {
        public required string Label { get; set; }

        public required string Link { get; set; }

        public required int Order { get; set; }
    }

    public class EducationRequest
    {
        public required string InstitutionName { get; set; }

        public required string FieldOfStudy { get; set; }

        public required string Degree { get; set; }

        public required int GraduationYear { get; set; }
    }

    public class ExperienceRequest
    {
        public required string CompanyName { get; set; }

        public required string JobTitle { get; set; }

        public required DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public required List<ExperienceDescriptionRequest> ExperienceDescriptions { get; set; }

        public class ExperienceDescriptionRequest
        {
            public required string Description { get; set; }

            public required int Order { get; set; }
        }
    }

    public class SkillGroup
    {
        public required string Name { get; set; }

        public required int Order { get; set; }

        public required List<SkillElement> SkillElements { get; set; }

        public class SkillElement
        {
            public required string Name { get; set; }

            public required int Order { get; set; }
        }
    }
}
