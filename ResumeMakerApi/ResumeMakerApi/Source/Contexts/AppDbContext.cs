using Microsoft.EntityFrameworkCore;
using ResumeMakerApi.Source.Entities;

namespace ResumeMakerApi.Source.Contexts;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Company> Companies { get; set; }

    public DbSet<Education> Educations { get; set; }

    public DbSet<Experience> Experiences { get; set; }

    public DbSet<ExperienceDescription> ExperienceDescriptions { get; set; }

    public DbSet<Resume> Resumes { get; set; }

    public DbSet<SkillElement> SkillElements { get; set; }

    public DbSet<SkillGroup> SkillGroups { get; set; }

    public DbSet<SocialMedia> SocialMedias { get; set; }

    public DbSet<User> Users { get; set; }
}
