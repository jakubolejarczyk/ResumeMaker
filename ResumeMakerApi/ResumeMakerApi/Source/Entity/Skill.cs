namespace ResumeMakerApi.Source.Entity;

public class Skill
{
    public int Id { get; set; }
    public string GroupTitle { get; set; } = string.Empty;
    public int Order { get; set; }
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;
    public List<SkillItem> SkillItems { get; set; } = [];
}
