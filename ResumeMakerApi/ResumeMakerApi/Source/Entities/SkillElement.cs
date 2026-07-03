namespace ResumeMakerApi.Source.Entity;

public class SkillElement
{
    public int Id { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public int Order { get; set; }
    public int SkillId { get; set; }
    public Skill Skill { get; set; } = null!;
}
