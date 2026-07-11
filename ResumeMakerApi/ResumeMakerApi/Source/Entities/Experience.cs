namespace ResumeMakerApi.Source.Entities;

public class Experience
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string JobTitle { get; set; } = string.Empty;

    public DateOnly StartDate { get; set; }
    
    public DateOnly? EndDate { get; set; }
    
    public int ResumeId { get; set; }
    
    public Resume Resume { get; set; } = new();

    public List<ExperienceDescription> ExperienceDescriptions { get; set; } = [];
}
