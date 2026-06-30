namespace ResumeMakerApi.Source.Entity;

public class SkillItem
{
    public int Id { get; set; }
    public string ItemTitle { get; set; } = string.Empty;
    public int Order { get; set; }
    public int SkillId { get; set; }
    public Skill Skill { get; set; } = null!;
}
