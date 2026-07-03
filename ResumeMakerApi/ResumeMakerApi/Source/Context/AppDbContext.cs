using Microsoft.EntityFrameworkCore;
using ResumeMakerApi.Source.Entities;
using ResumeMakerApi.Source.Entity;

namespace ResumeMakerApi.Source.Context;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Phone> Phones { get; set; }
    public DbSet<Education> Educations { get; set; }
    public DbSet<Experience> Experiences { get; set; }
    public DbSet<ExperienceDescription> ExperienceDescriptions { get; set; }
    public DbSet<Resume> Resumes { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<SkillElement> SkillElements { get; set; }
    public DbSet<SocialMedia> SocialMedias { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
}
