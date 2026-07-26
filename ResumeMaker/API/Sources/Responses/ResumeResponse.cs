namespace API.Sources.Requests;

public class ResumeResponse
{
    public required int Id { get; set; }

    public required string Name { get; set; }

    public required string JobTitle { get; set; }

    public required string Description { get; set; }

    public required int UserId { get; set; }

    public required List<SocialMediaResponse> SocialMedias { get; set; }

    public required List<EducationResponse> Educations { get; set; }

    public required List<ExperienceResponse> Experiences{ get; set; }

    public required List<SkillGroupResponse> SkillGroups { get; set; }

    public class SocialMediaResponse
    {
        public required int Id { get; set; }

        public required string Label { get; set; }

        public required string Link { get; set; }

        public required int Order { get; set; }

        public required int ResumeId { get; set; }
    }

    public class EducationResponse
    {
        public required int Id { get; set; }

        public required string InstitutionName { get; set; }

        public required string FieldOfStudy { get; set; }

        public required string Degree { get; set; }

        public required int GraduationYear { get; set; }

        public required int ResumeId { get; set; }
    }

    public class ExperienceResponse
    {
        public required int Id { get; set; }

        public required string CompanyName { get; set; }

        public required string JobTitle { get; set; }

        public required DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public required int ResumeId { get; set; }

        public required List<ExperienceDescriptionResponse> ExperienceDescriptions { get; set; }

        public class ExperienceDescriptionResponse
        {
            public required string Description { get; set; }

            public required int Order { get; set; }

            public required int ExperienceId { get; set; }
        }
    }

    public class SkillGroupResponse
    {
        public required int Id { get; set; }

        public required string Name { get; set; }

        public required int Order { get; set; }

        public required int ResumeId { get; set; }


        public required List<SkillElementResponse> SkillElements { get; set; }

        public class SkillElementResponse
        {
            public required string Name { get; set; }

            public required int Order { get; set; }

            public required int SkillGroupId { get; set; }
        }
    }
}
