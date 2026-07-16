namespace API.Sources.DTOs;

public class RepositoryDTO<TBody>
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public TBody? Body { get; set; }
}
