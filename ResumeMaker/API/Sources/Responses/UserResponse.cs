namespace API.Sources.Responses;

public class UserResponse
{
    public required string Email { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public required string PhoneNumber { get; set; }
}
