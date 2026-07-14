namespace ResumeMakerApi.Source.Models;

public class EducationModel
{
    public required string InstitutionName { get; set; }

    public required string FieldOfStudy { get; set; }

    public required string Degree { get; set; }

    public required int GraduationYear { get; set; }
}
