namespace API.Sources.Entities;

public class Company
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public bool IncludeConsentClause { get; set; }

    public string? CustomConsentClause { get; set; }

    public string RecruitmentStatus { get; set; } = string.Empty;

    public int UserId { get; set; }

    public User User { get; set; } = null!;
}
