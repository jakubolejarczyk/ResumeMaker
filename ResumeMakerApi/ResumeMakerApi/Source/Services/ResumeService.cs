using ResumeMakerApi.Source.Context;
using ResumeMakerApi.Source.Model;

namespace ResumeMakerApi.Source.Services;

public class ResumeService : IResumeService
{
    private readonly AppDbContext _appDbContext;

    public ResumeService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public ResumeResponse GetResume(int resumeId, int userId)
    {
        var user = _appDbContext.Users.Where(u => u.Id == userId).FirstOrDefault();
        return new ResumeResponse()
        {
            User = user
        };
    }
}
