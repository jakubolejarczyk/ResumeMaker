namespace ResumeMakerApi.Source.Entities;

public class Company
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public int UserId { get; set; }

    public User User { get; set; } = new();
}
