using API.Sources.Entities;

namespace API.Sources.Responses;

public class ReadCompaniesResponse
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public required List<Company> Companies { get; set; }
}
