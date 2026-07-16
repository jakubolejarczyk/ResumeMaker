namespace API.Sources.Cores;

public class StoreCore<TDate>(TDate date)
{
    public TDate Date { get; } = date;
}
