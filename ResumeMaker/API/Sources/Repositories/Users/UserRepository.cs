using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories.Users;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public ResponseCore<User> Create(User user)
    {
        var emailExists = context.Users.FirstOrDefault(u => u.Email == user.Email);
        if (emailExists != null)
        {
            return new ResponseCore<User>
            {
                Success = false,
                Message = "The email address is already taken."
            };
        }
        context.Users.Add(user);
        context.SaveChanges();
        return new ResponseCore<User>
        {
            Success = true,
            Message = "The user was created successfully.",
            Body = user
        };
    }

    public ResponseCore<User> Read(int id)
    {
        var user = context.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return new ResponseCore<User>
            {
                Success = false,
                Message = "Failed to retrieve the user."
            };
        }
        return new ResponseCore<User>
        {
            Success = true,
            Message = "Successfully retrieved the user.",
            Body = user
        };
    }

    public ResponseCore<List<User>> ReadAll()
    {
        var users = context.Users.ToList();
        if (users.Count > 0)
        {
            return new ResponseCore<List<User>>
            {
                Success = true,
                Message = $"Successfully retrieved {users.Count} users.",
                Body = users
            };
        }
        return new ResponseCore<List<User>>
        {
            Success = false,
            Message = "No users found."
        };
    }

    public ResponseCore<User> Update(User user)
    {
        var userById = context.Users.FirstOrDefault(u => u.Id == user.Id);
        if (userById == null)
        {
            return new ResponseCore<User>
            {
                Success = false,
                Message = "Failed to update the user because it does not exist."
            };
        }
        if (userById.Id != user.Id)
        {
            return new ResponseCore<User>
            {
                Success = false,
                Message = "Failed to update the user due to an internal error."
            };
        }
        var emailExists = context.Users.FirstOrDefault(u => u.Email == user.Email);
        if (emailExists != null && userById.Email != user.Email)
        {
            return new ResponseCore<User>
            {
                Success = false,
                Message = "The email address is already taken."
            };
        }
        userById.Email = user.Email;
        userById.FirstName = user.FirstName;
        userById.LastName = user.LastName;
        userById.City = user.City;
        userById.Country = user.Country;
        userById.PhoneNumber = user.PhoneNumber;
        context.Users.Update(userById);
        context.SaveChanges();
        return new ResponseCore<User>
        {
            Success = true,
            Message = "Successfully updated the user.",
            Body = userById
        };
    }

    public ResponseCore<User> Delete(int id)
    {
        var user = context.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return new ResponseCore<User>
            {
                Success = false,
                Message = $"Failed to delete user because user with ID {id} does not exist."
            };
        }
        context.Users.Remove(user);
        context.SaveChanges();
        return new ResponseCore<User>
        {
            Success = true,
            Message = $"User with ID {id} has been deleted successfully.",
            Body = user
        };
    }
}
