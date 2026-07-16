using API.Sources.Entities;
using API.Sources.Requests;
using API.Sources.Responses;
using API.Sources.Stores;

namespace API.Sources.Repositories;

public class UserRepository(UserStore store) : IUserRepository
{
    public CreateUserResponse CreateUser(CreateUserRequest user)
    {
        var newUser = new User
        {
            Id = store.Users.Count + 1,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            City = user.City,
            Country = user.Country,
            PhoneNumber = user.PhoneNumber
        };
        store.Users.Add(newUser);
        return new CreateUserResponse
        {
            Success = true,
            Message = "User created successfully."
        };
    }

    public ReadUserResponse? ReadUser(int id)
    {
        var user = store.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return null;
        }
        return new ReadUserResponse
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            City = user.City,
            Country = user.Country,
            PhoneNumber = user.PhoneNumber
        };
    }
}
