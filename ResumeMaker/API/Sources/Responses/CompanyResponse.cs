namespace API.Sources.Responses;

public class CompanyResponse
{
    public required string CompanyName { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public required bool IncludeConsentClause { get; set; }

    public string? CustomConsentClause { get; set; }

    public required string RecruitmentStatus { get; set; }

    public required int UserId { get; set; }
}
