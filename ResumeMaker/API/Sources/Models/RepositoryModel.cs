namespace API.Sources.Models;

public class RepositoryModel<TData>
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public required TData Data { get; set; }
}
