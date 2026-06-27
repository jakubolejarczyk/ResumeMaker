using Microsoft.EntityFrameworkCore;
using ResumeMakerApi.Sources.Models.Requests;

namespace ResumeMakerApi.Sources.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<ResumeRequest> Dogs => Set<ResumeRequest>();
    }
}
