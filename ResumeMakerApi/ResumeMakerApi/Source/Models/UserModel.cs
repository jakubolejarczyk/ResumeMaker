namespace ResumeMakerApi.Source.Models;

public class UserModel
{
    public required string Email { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string CountryCode { get; set; }

    public required string PhoneNumber { get; set; }
}
