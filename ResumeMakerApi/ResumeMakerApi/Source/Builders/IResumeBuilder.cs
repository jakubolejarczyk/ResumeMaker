using ResumeMakerApi.Source.Dtos;

namespace ResumeMakerApi.Source.Builders;

public interface IResumeBuilder
{
    public byte[] Build(ResumeDto resumeDto);
}
