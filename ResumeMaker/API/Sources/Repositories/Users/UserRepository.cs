using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.Users;

public class UserRepository(UserStore store) : IUserRepository
{
    public RepositoryDTO<User> Create(User user)
    {
        user.Id = store.Data.Count;
        var emailExists = store.Data.FirstOrDefault(u => u.Email == user.Email);
        if (emailExists != null)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "The email address is already taken."
            };
        }
        store.Data.Add(user);
        return new RepositoryDTO<User>
        {
            Success = true,
            Message = "The user was created successfully.",
            Body = user
        };
    }

    public RepositoryDTO<User> Read(int id)
    {
        var user = store.Data.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "Failed to retrieve the user."
            };
        }
        return new RepositoryDTO<User>
        {
            Success = true,
            Message = "Successfully retrieved the user.",
            Body = user
        };
    }

    public RepositoryDTO<List<User>> ReadAll()
    {
        var users = store.Data;
        return new RepositoryDTO<List<User>>
        {
            Success = true,
            Message = $"Successfully retrieved {users.Count} users.",
            Body = users
        };
    }

    public RepositoryDTO<User> Update(int id, User user)
    {
        var currentUser = store.Data.FirstOrDefault(u => u.Id == id);
        if (currentUser == null)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "Failed to update the user because it does not exist."
            };
        }
        if (currentUser.Id != user.Id)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "Failed to update the user due to an internal error."
            };
        }
        var emailExists = store.Data.FirstOrDefault(u => u.Email == user.Email);
        if (emailExists != null)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "The email address is already taken."
            };
        }
        currentUser.Email = user.Email;
        currentUser.FirstName = currentUser.FirstName;
        currentUser.LastName = currentUser.LastName;
        currentUser.City = currentUser.City;
        currentUser.Country = currentUser.Country;
        currentUser.PhoneNumber = currentUser.PhoneNumber;
        store.Data = store.Data.Select(u => u.Id == id ? currentUser : u).ToList();
        return new RepositoryDTO<User>
        {
            Success = true,
            Message = "Successfully updated the user.",
            Body = currentUser
        };
    }

    public RepositoryDTO<User> Delete(int id)
    {
        var user = store.Data.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "Failed to delete the user because it does not exist."
            };
        }
        store.Data.Remove(user);
        return new RepositoryDTO<User>
        {
            Success = true,
            Message = "Successfully deleted the user.",
            Body = user
        };
    }
}
