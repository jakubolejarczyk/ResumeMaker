using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.Users;

public class UserRepository(UserStore store) : IUserRepository
{
    public RepositoryDTO<User> Create(User user)
    {
        throw new NotImplementedException();
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
        throw new NotImplementedException();
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
