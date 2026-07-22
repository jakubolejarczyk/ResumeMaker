namespace API.Sources.Entities;

public class Resume
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string JobTitle { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int UserId { get; set; }

    public User User { get; set; } = null!;

    public List<Resume> Resumes { get; set; } = [];

    public List<Education> Educations { get; set; } = [];

    public List<Experience> Experiences { get; set; } = [];

    public List<SkillGroup> SkillGroups { get; set; } = [];
}
