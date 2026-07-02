using ResumeMakerApi.Source.Model;

namespace ResumeMakerApi.Source.Services;

public interface IResumeService
{
    ResumeResponse GetResume(int resumeId, int userId);
}
