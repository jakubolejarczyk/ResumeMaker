using API.Sources.Entities;

namespace API.Sources.Responses;

public class DeleteUserResponse
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public required User? User { get; set; }
}
