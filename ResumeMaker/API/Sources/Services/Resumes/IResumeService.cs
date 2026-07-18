using API.Sources.Cores;
using API.Sources.Requests;

namespace API.Sources.Services.Resumes;

public interface IResumeService
{
    ResponseCore<ResumeResponse> CreateResume(ResumeResponse request);

    ResponseCore<ResumeResponse> ReadResume(int id);

    ResponseCore<List<ResumeResponse>> ReadResumes();

    ResponseCore<ResumeResponse> UpdateResume(int id, ResumeResponse request);

    ResponseCore<ResumeResponse> DeleteResume(int id);

    byte[] GeneratePDFResume(int userId, int companyId, int resumeId);
}
