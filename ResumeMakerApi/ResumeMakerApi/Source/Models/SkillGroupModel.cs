namespace ResumeMakerApi.Source.Models;

public class SkillGroupModel
{
    public required string Title { get; set; }

    public required List<SkillElementModel> SkillElements { get; set; }
}
