using API.Sources.Models;

namespace API.Sources.Services;

public class UserService : IUserService
{
    List<User> Users = new List<User>
    {
        new User{ Id = 1, Email = "john.doe@example.com", FirstName = "John", LastName = "Doe", City = "New York", Country = "USA", PhoneNumber = "123-456-7890" },
        new User{ Id = 2, Email = "jane.smith@example.com", FirstName = "Jane", LastName = "Smith", City = "Los Angeles", Country = "USA", PhoneNumber = "098-765-4321" },
        new User{ Id = 3, Email = "bob.johnson@example.com", FirstName = "Bob", LastName = "Johnson", City = "Chicago", Country = "USA", PhoneNumber = "555-123-4567" }
    };

    public Task<User> CreateUserAsync(User user)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteUserAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<User?> ReadUserAsync(int id)
    {
        var result = Users.FirstOrDefault(u => u.Id == id);
        return Task.FromResult(result);
    }

    public Task<List<User>> ReadUsersAsync()
    {
        return Task.FromResult(Users);
    }

    public Task<bool> UpdateUserAsync(int id, User user)
    {
        throw new NotImplementedException();
    }
}
