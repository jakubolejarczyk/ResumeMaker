namespace ResumeMakerApi.Source.Entities;

public class Phone
{
    public int Id { get; set; }

    public string CountryCode { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public bool ShowInResume { get; set; }

    public int UserId { get; set; }

    public User User { get; set; } = new();
}
