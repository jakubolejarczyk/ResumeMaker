using API.Sources.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Sources.Contexts;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Company> Companies => Set<Company>();

    public DbSet<Education> Educations => Set<Education>();

    public DbSet<Experience> Experiences => Set<Experience>();

    public DbSet<ExperienceDescription> ExperienceDescriptions => Set<ExperienceDescription>();

    public DbSet<Resume> Resumes => Set<Resume>();

    public DbSet<SkillElement> SkillElements => Set<SkillElement>();

    public DbSet<SkillGroup> SkillGroups => Set<SkillGroup>();

    public DbSet<SocialMedia> SocialMedias => Set<SocialMedia>();

    public DbSet<User> Users => Set<User>();
}
