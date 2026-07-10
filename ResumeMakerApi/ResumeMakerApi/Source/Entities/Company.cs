namespace ResumeMakerApi.Source.Entities;

public class Company
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public List<Experience> Experiences { get; set; } = [];

    public List<Company> Companies { get; set; } = [];
}
