using ResumeMakerApi.Source.Entities;

namespace ResumeMakerApi.Source.Entity;

public class Resume
{
    public int Id { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public List<SocialMedia> SocialMedias { get; set; } = [];
    public List<Education> Educations { get; set; } = [];
    public List<Experience> Experiences { get; set; } = [];
    public List<Skill> Skills { get; set; } = [];
}
