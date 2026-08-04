using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public interface IResumeService
{
    ResponseCore<ResumeResponse> Create(ResumeRequest request);

    ResponseCore<ResumeResponse> Read(int id);

    ResponseCore<List<ResumeResponse>> ReadAllForUser(int userId);

    ResponseCore<ResumeResponse> Update(int id, ResumeRequest request);

    ResponseCore<ResumeResponse> Delete(int id);
}
