namespace ResumeMakerApi.Source.Entities;

public class Education
{
    public int Id { get; set; }

    public string InstitutionName { get; set; } = string.Empty;

    public string FieldOfStudy { get; set; } = string.Empty;

    public string Degree { get; set; } = string.Empty;

    public DateOnly StartYear { get; set; }

    public DateOnly EndYear { get; set; }

    public int ResumeId { get; set; }

    public Resume Resume { get; set; } = new();
}
