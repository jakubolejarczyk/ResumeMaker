using API.Sources.Entities;
using API.Sources.Repositories;
using API.Sources.Requests;
using API.Sources.Responses;
using API.Sources.Stores;

namespace API.Sources.Services;

public class UserService(IUserRepository repository, UserStore store) : IUserService
{
    public Task<CreateUserResponse> CreateUser(CreateUserRequest request)
    {
        var newUser = new User
        {
            Id = store.Users.Count + 1,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            City = request.City,
            Country = request.Country,
            PhoneNumber = request.PhoneNumber
        };
        var user = repository.CreateUser(newUser);
        var response = new CreateUserResponse
        {
            Success = user.Success,
            Message = user.Message,
            User = user.Data
        };
        return Task.FromResult(response);
    }

    public Task<ReadUserResponse> ReadUser(int id)
    {
        var user = repository.ReadUser(id);
        var response = new ReadUserResponse
        {
            Success = user.Success,
            Message = user.Message,
            User = user.Data
        };
        return Task.FromResult(response);
    }
}
