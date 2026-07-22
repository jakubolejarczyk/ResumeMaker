namespace API.Sources.Entities;

public class SkillGroup
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Order { get; set; }

    public int ResumeId { get; set; }

    public Resume Resume { get; set; } = null!;

    public List<SkillElement> SkillElements { get; set; } = [];
}
