using ResumeMakerApi.Sources.Models.Requests;

namespace ResumeMakerApi.Sources.Services;

public class ResumeService : IResumeService
{
    public string GetResume(ResumeRequest request)
    {
        int userId = request.UserId;
        int resumeId = request.ResumeId;
        return $"Resume for User ID: {userId}, Resume ID: {resumeId}";
    }
}
