using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public interface IUserService
{
    Task<CreateUserResponse> CreateUser(CreateUserRequest request);

    Task<ReadUserResponse> ReadUser(int id);

    Task<ReadUsersResponse> ReadUsers();
}
