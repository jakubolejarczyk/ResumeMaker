using API.Sources.Models;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public class UserService : IUserService
{
    public async Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request)
    {
        string firstName = request.User.FirstName;
        string lastName = request.User.LastName;
        var response = new CreateUserResponse
        {
            Success = true,
            Message = $"User {firstName} {lastName} has been created successfully."
        };
        return await Task.FromResult(response);
    }

    public Task<bool> DeleteUserAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<User?> ReadUserAsync(int id)
    {
        throw new NotImplementedException();
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
