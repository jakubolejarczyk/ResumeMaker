using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Repositories;

public interface IUserRepository
{
    CreateUserResponse CreateUser(CreateUserRequest user);

    ReadUserResponse? ReadUser(int id);
}
