using API.Sources.Models;

namespace API.Sources.Services;

public interface IUserService
{
    Task<User> CreateUserAsync(User user);

    Task<User?> ReadUserAsync(int id);

    Task<bool> UpdateUserAsync(int id, User user);

    Task<List<User>> ReadUsersAsync();

    Task<bool> DeleteUserAsync(int id);
}
