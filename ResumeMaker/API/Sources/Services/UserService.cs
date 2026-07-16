using API.Sources.Entities;
using API.Sources.Repositories;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public class UserService(IUserRepository repository) : IUserService
{
    public async Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request)
    {
        var response = repository.CreateUser(request);
        return await Task.FromResult(response);
    }

    public Task<bool> DeleteUserAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ReadUserResponse?> ReadUserAsync(int id)
    {
        var response = repository.ReadUser(id);
        return Task.FromResult(response);
    }

    public Task<List<User>> ReadUsersAsync()
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateUserAsync(int id, User user)
    {
        throw new NotImplementedException();
    }
}
