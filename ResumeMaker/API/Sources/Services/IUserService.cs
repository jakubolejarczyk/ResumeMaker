using API.Sources.Entities;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public interface IUserService
{
    Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request);

    Task<ReadUserResponse?> ReadUserAsync(int id);

    Task<bool> UpdateUserAsync(int id, User user);

    Task<List<User>> ReadUsersAsync();

    Task<bool> DeleteUserAsync(int id);
}
