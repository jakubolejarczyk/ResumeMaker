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

    public RepositoryDTO<User> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<User> Read(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<User>> ReadAll()
    {
        var users = store.Date;
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
}
