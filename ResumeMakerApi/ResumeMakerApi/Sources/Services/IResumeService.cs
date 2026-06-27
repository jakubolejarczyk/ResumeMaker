using ResumeMakerApi.Sources.Models.Requests;

namespace ResumeMakerApi.Sources.Services;

public interface IResumeService
{
    string GetResume(ResumeRequest request);
}
