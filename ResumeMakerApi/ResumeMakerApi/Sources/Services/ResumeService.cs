using ResumeMakerApi.Sources.Models.Responses;

namespace ResumeMakerApi.Sources.Services;

public class ResumeService : IResumeService
{
    public ResumeResponse GetResume(int userId, int resumeId)
    {
        return new ResumeResponse
        {
            UserId = userId,
            ResumeId = resumeId
        };
    }
}
