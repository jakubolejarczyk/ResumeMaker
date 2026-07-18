using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Users;

public interface IUserService
{
    ResponseCore<UserResponse> CreateUser(UserRequest request);

    ResponseCore<UserResponse> ReadUser(int id);

    ResponseCore<List<UserResponse>> ReadUsers();

    ResponseCore<UserResponse> UpdateUser(int id, UserRequest request);

    ResponseCore<UserResponse> DeleteUser(int id);
}
