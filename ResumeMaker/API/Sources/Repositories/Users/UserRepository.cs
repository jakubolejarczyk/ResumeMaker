using API.Sources.Contexts;
using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.Users;

public class UserRepository(AppDbContext appDbContext) : IUserRepository
{
    public RepositoryDTO<User> Create(User user)
    {
        var emailExists = appDbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        if (emailExists != null)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "The email address is already taken."
            };
        }
        appDbContext.Add(user);
        appDbContext.SaveChanges();
        return new RepositoryDTO<User>
        {
            Success = true,
            Message = "The user was created successfully.",
            Body = user
        };
    }

    public RepositoryDTO<User> Read(int id)
    {
        var user = appDbContext.Users.FirstOrDefault(u => u.Id == id);
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
        var users = appDbContext.Users.ToList();
        return new RepositoryDTO<List<User>>
        {
            Success = true,
            Message = $"Successfully retrieved {users.Count} users.",
            Body = users
        };
    }

    public RepositoryDTO<User> Update(int id, User user)
    {
        var currentUser = appDbContext.Users.FirstOrDefault(u => u.Id == id);
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
        var emailExists = appDbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        if (emailExists != null && currentUser.Email != user.Email)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "The email address is already taken."
            };
        }
        currentUser.Email = user.Email;
        currentUser.FirstName = user.FirstName;
        currentUser.LastName = user.LastName;
        currentUser.City = user.City;
        currentUser.Country = user.Country;
        currentUser.PhoneNumber = user.PhoneNumber;
        appDbContext.Update(currentUser);
        appDbContext.SaveChanges();
        return new RepositoryDTO<User>
        {
            Success = true,
            Message = "Successfully updated the user.",
            Body = currentUser
        };
    }

    public RepositoryDTO<User> Delete(int id)
    {
        var user = appDbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return new RepositoryDTO<User>
            {
                Success = false,
                Message = "Failed to delete the user because it does not exist."
            };
        }
        appDbContext.Users.Remove(user);
        appDbContext.SaveChanges();
        return new RepositoryDTO<User>
        {
            Success = true,
            Message = "Successfully deleted the user.",
            Body = user
        };
    }
}
