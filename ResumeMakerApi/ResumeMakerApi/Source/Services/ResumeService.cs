using ResumeMakerApi.Source.Builders;
using ResumeMakerApi.Source.Repositories;

namespace ResumeMakerApi.Source.Services;

public class ResumeService : IResumeService
{
    private readonly IResumeBuilder _resumeBuilder;
    private readonly ResumeRepository resumeRepository;

    public ResumeService(IResumeBuilder resumeBuilder, ResumeRepository resumeRepository)
    {
        _resumeBuilder = resumeBuilder;
        this.resumeRepository = resumeRepository;
    }

    public byte[] Run()
    {
        var resumeDto = resumeRepository.GetResumeDto(1, 1, 1);
        if (resumeDto == null)
        {
            return [];
        }
        return _resumeBuilder.Build(resumeDto);
    }
}
