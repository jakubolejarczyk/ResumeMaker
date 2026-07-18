using API.Sources.Requests;

namespace API.Sources.Services.Resumes;

public interface IResumeService
{
    void CreateResume(CreateResumeRequest request);

    void ReadResume();

    void ReadResumes();

    void UpdateResume();

    void DeleteResume();

    void GeneratePDFResume();
}
