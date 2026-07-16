namespace API.Sources.Cores;

public class StoreCore<TData>(TData data)
{
    public TData Data { get; } = data;
}
