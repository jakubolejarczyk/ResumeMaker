namespace ResumeMakerApi.Source.Entities;

public class Company
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public bool IncludePrivacyConsentClause { get; set; }

    public int UserId { get; set; }

    public User User { get; set; } = new();
}
