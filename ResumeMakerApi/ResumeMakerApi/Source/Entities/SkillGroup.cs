namespace ResumeMakerApi.Source.Entities;

public class SkillGroup
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public int Order { get; set; }

    public int ResumeId { get; set; }

    public Resume Resume { get; set; } = new();

    public List<SkillElement> SkillElements { get; set; } = [];
}
