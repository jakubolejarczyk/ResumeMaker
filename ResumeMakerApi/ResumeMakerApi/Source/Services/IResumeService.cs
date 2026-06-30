using ResumeMakerApi.Sources.Models.Responses;

namespace ResumeMakerApi.Sources.Services;

public interface IResumeService
{
    ResumeResponse GetResume(int userId, int resumeId);
}
