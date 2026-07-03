using Microsoft.EntityFrameworkCore;
using ResumeMakerApi.Source.DTOs;
using ResumeMakerApi.Source.Infrastructure;

namespace ResumeMakerApi.Source.Services;

public class ResumeService(AppDbContext appDbContext) : IResumeService
{
    public ResumeDto? GetResume(int userId)
    {
        var user = appDbContext.Users
            .Where(u => u.Id == userId)
            .FirstOrDefault();
        return user == null ? null : new ResumeDto
        {
            FirstName = user.FirstName,
            LastName = user.LastName
        };
    }
}
