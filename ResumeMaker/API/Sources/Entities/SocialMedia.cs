namespace API.Sources.Entities;

public class SocialMedia
{
    public int Id { get; set; }

    public string Label { get; set; } = string.Empty;

    public string Link { get; set; } = string.Empty;

    public int Order { get; set; }

    public int ResumeId { get; set; }

    public Resume Resume { get; set; } = null!;
}
