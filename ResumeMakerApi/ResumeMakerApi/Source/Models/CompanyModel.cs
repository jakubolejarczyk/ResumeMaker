namespace ResumeMakerApi.Source.Models;

public class CompanyModel
{
    public required string Name { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public required bool IncludePrivacyConsentClause { get; set; }
}
