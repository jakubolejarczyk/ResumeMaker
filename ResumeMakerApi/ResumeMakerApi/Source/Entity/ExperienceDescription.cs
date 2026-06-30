namespace ResumeMakerApi.Source.Entity;

public class ExperienceDescription
{
    public int Id { get; set; }
    public string Value { get; set; } = string.Empty;
    public int Order { get; set; }
    public int ExperienceId { get; set; }
    public Experience Experience { get; set; } = null!;
}
