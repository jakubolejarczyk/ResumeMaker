using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public interface IUserService
{
    ResponseCore<UserResponse> Create(UserRequest request);

    ResponseCore<UserResponse> Read(int id);

    ResponseCore<List<UserResponse>> ReadAll();

    ResponseCore<UserResponse> Update(int id, UserRequest request);

    ResponseCore<UserResponse> Delete(int id);
}
