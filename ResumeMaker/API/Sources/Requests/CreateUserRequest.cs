using API.Sources.Models;

namespace API.Sources.Requests;

public class CreateUserRequest
{
    public required User User { get; set; }
}
