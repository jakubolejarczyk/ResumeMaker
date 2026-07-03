namespace ResumeMakerApi.Source.Entities;

public class Skill
{
    public int Id { get; set; }

    public string GroupTitle { get; set; } = string.Empty;

    public int Order { get; set; }

    public int ResumeId { get; set; }

    public Resume Resume { get; set; } = new();

    public List<SkillElement> SkillElements { get; set; } = [];
}
