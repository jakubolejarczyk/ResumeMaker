using Microsoft.EntityFrameworkCore;
using ResumeMakerApi.Source.Entities;

namespace ResumeMakerApi.Source.Infrastructure;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Education> Educations { get; set; }

    public DbSet<Experience> Experiences { get; set; }

    public DbSet<ExperienceElement> ExperienceElements { get; set; }

    public DbSet<Phone> Phones { get; set; }

    public DbSet<Resume> Resumes { get; set; }

    public DbSet<Skill> Skills { get; set; }

    public DbSet<SkillElement> SkillElements { get; set; }

    public DbSet<SocialMedia> SocialMedias { get; set; }

    public DbSet<User> Users { get; set; }
}
