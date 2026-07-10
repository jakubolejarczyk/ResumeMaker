namespace ResumeMakerApi.Source.Entities;

public class Company
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public List<Resume> Resumes { get; set; } = [];
}
