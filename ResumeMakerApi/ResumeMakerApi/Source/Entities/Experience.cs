namespace ResumeMakerApi.Source.Entities;

public class Experience
{
    public int Id { get; set; }

    public DateOnly DateStart { get; set; }
    
    public DateOnly? DateEnd { get; set; }
    
    public string JobTitle { get; set; } = string.Empty;
    
    public int ResumeId { get; set; }
    
    public Resume Resume { get; set; } = new();

    public int CompanyId { get; set; }

    public Company Company { get; set; } = new();

    public List<ExperienceElement> ExperienceElements { get; set; } = [];
}
