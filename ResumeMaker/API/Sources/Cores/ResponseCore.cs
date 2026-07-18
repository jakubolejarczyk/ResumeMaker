namespace API.Sources.Cores;

public class ResponseCore<TBody>
{
    public required bool Success { get; set; }

    public required string Message { get; set; }

    public int? Id { get; set; }

    public TBody? Body { get; set; }
}
