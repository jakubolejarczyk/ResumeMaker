namespace ResumeMakerApi.Source.Entities;

public class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public List<Phone> Phones { get; set; } = [];

    public List<Resume> Resumes { get; set; } = [];
}
