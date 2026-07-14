namespace ResumeMakerApi.Source.Models;

public class ExperienceModel
{
    public required string CompanyName { get; set; }

    public required string JobTitle { get; set; }

    public required DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public required List<ExperienceDescriptionModel> ExperienceDescriptions { get; set; }
}
