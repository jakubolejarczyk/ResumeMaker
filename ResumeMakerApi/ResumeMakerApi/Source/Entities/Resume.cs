namespace ResumeMakerApi.Source.Entities;

public class Resume
{
    public int Id { get; set; }

    public string JobTitle { get; set; } = string.Empty;
    
    public int UserId { get; set; }

    public User User { get; set; } = new();

    public int CompanyId { get; set; }

    public Company Company { get; set; } = new();

    public List<Education> Educations { get; set; } = [];
    
    public List<Experience> Experiences { get; set; } = [];
    
    public List<Skill> Skills { get; set; } = [];

    public List<SocialMedia> SocialMedias { get; set; } = [];
}
