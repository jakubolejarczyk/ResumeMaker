using API.Sources.Entities;
using API.Sources.Models;
using API.Sources.Stores;

namespace API.Sources.Repositories;

public class UserRepository(UserStore store) : IUserRepository
{
    public RepositoryModel<User?> CreateUser(User user)
    {
        var emailExists = store.Users.FindAll(u => u.Email == user.Email).Any();
        if (emailExists)
        {
            return new RepositoryModel<User?>
            {
                Success = false,
                Message = "User with this email already exists.",
                Data = null
            };
        }
        store.Users.Add(user);
        return new RepositoryModel<User?>
        {
            Success = true,
            Message = "User created successfully.",
            Data = user
        };
    }

    public RepositoryModel<User?> ReadUser(int id)
    {
        var user = store.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return new RepositoryModel<User?>
            {
                Success = false,
                Message = "User not found.",
                Data = null
            };
        }
        return new RepositoryModel<User?>
        {
            Success = true,
            Message = "User found.",
            Data = user
        };
    }
}
