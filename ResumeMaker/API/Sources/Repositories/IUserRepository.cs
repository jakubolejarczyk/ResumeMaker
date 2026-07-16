using API.Sources.Entities;
using API.Sources.Models;

namespace API.Sources.Repositories;

public interface IUserRepository
{
    RepositoryModel<User?> CreateUser(User user);

    RepositoryModel<User?> ReadUser(int id);

    RepositoryModel<List<User>> ReadUsers();
}
