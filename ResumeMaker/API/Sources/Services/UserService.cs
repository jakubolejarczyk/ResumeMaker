using API.Sources.Entities;
using API.Sources.Requests;
using API.Sources.Responses;
using API.Sources.Stores;

namespace API.Sources.Services;

public class UserService(UserStore store) : IUserService
{
    public async Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request)
    {
        var user = new User
        {
            Id = store.Users.Count,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            City = request.City,
            Country = request.Country,
            PhoneNumber = request.PhoneNumber
        };
        store.Users.Add(user);
        var response = new CreateUserResponse
        {
            Success = true,
            Message = "User has been created successfully."
        };
        return await Task.FromResult(response);
    }

    public Task<bool> DeleteUserAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<User?> ReadUserAsync(int id)
    {
        var user = store.Users.FirstOrDefault(u => u.Id == id);
        return Task.FromResult(user);
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
