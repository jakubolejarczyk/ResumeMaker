using ResumeMakerApi.Source.DTOs;

namespace ResumeMakerApi.Source.Services;

public interface IResumeService
{
    ResumeDto? GetResume(int userId);
}
