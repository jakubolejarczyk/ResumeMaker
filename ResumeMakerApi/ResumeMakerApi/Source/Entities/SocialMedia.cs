using ResumeMakerApi.Source.Entities;

namespace ResumeMakerApi.Source.Entity;

public class SocialMedia
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public int Order { get; set; }
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;
}
