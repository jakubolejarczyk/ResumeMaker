namespace API.Sources.Entities;

public class SkillElement
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Order { get; set; }

    public int SkillGroupId { get; set; }
}
