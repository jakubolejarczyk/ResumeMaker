using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.Users;

public interface IUserRepository
{
    RepositoryDTO<User> Create(User user);

    RepositoryDTO<User> Read(int id);

    RepositoryDTO<List<User>> ReadAll();

    RepositoryDTO<User> Update(int id, User user);

    RepositoryDTO<User> Delete(int id);
}
