namespace ResumeMakerApi.Source.Entities;

public class Resume
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string JobTitle { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string Language { get; set; } = string.Empty;

    public int UserId { get; set; }

    public User User { get; set; } = new();

    public List<SocialMedia> SocialMedias { get; set; } = [];

    public List<Education> Educations { get; set; } = [];
    
    public List<Experience> Experiences { get; set; } = [];
    
    public List<SkillGroup> SkillGroups { get; set; } = [];
}
