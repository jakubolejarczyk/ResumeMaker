namespace ResumeMakerApi.Source.Entities;

public class Phone
{
    public int Id { get; set; }

    public string CountryCode { get; set; } = string.Empty;

    public string LocalPhoneNumber { get; set; } = string.Empty;

    public int UserId { get; set; }

    public User User { get; set; } = new();
}
