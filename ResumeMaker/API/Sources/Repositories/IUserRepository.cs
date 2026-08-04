using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface IUserRepository
{
    ResponseCore<User> Create(User user);

    ResponseCore<User> Read(int id);

    ResponseCore<List<User>> ReadAll();

    ResponseCore<User> Update(int id, User user);

    ResponseCore<User> Delete(int id);
}
