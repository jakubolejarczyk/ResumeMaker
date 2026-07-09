using ResumeMakerApi.Source.Builders;

namespace ResumeMakerApi.Source.Services;

public class ResumeService : IResumeService
{
    private readonly IResumeBuilder _resumeBuilder;

    public ResumeService(IResumeBuilder resumeBuilder)
    {
        _resumeBuilder = resumeBuilder;
    }

    public byte[] Run()
    {
        return _resumeBuilder.Build();
    }
}
