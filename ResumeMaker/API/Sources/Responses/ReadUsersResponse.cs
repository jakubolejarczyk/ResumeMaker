using API.Sources.Entities;

namespace API.Sources.Responses;

public class ReadUsersResponse
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public required List<User> Users { get; set; }
}
