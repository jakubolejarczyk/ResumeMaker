using ResumeMakerApi.Source.Entities;

namespace ResumeMakerApi.Source.Entity;

public class Education
{
    public int Id {  get; set; }
    public string InstitutionName { get; set; } = string.Empty;
    public string FieldOfStudy { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public int GraduationYear { get; set; }
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;
}
