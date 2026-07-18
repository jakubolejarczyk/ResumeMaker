using API.Sources.Entities;

namespace API.Sources.Responses;

public class ReadCompanyResponse
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public required Company? Company { get; set; }
}
