using API.Sources.Entities;

namespace API.Sources.Responses;

public class UpdateCompanyResponse
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public required Company? Company { get; set; }
}
