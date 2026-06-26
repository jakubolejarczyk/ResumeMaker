using Microsoft.EntityFrameworkCore;
using ResumeMakerApi.Models;

namespace ResumeMakerApi.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Dog> Dogs => Set<Dog>();
    }
}
