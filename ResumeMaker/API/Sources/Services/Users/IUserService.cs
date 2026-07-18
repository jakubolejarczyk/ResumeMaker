using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Users;

public interface IUserService
{
    CreateUserResponse CreateUser(CreateUserRequest request);

    ReadUserResponse ReadUser(int id);

    ReadUsersResponse ReadUsers();

    UpdateUserResponse UpdateUser(int id, UpdateUserRequest request);

    DeleteUserResponse DeleteUser(int id);
}
