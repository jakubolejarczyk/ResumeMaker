using API.Sources.Cores;
using API.Sources.Requests;

namespace API.Sources.Services.Resumes;

public class ResumeService : IResumeService
{
    public ResponseCore<ResumeResponse> CreateResume(ResumeResponse request)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<ResumeResponse> DeleteResume(int id)
    {
        throw new NotImplementedException();
    }

    public byte[] GeneratePDFResume(int userId, int companyId, int resumeId)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<ResumeResponse> ReadResume(int id)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<List<ResumeResponse>> ReadResumes()
    {
        throw new NotImplementedException();
    }

    public ResponseCore<ResumeResponse> UpdateResume(int id, ResumeResponse request)
    {
        throw new NotImplementedException();
    }
}
