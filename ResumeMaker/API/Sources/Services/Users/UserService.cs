using API.Sources.Repositories.Users;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Users;

public class UserService(UserRepository userRepository) : IUserService
{
    public CreateUserResponse CreateUser(CreateUserRequest request)
    {
        throw new NotImplementedException();
    }

    public ReadUserResponse ReadUser(int id)
    {
        throw new NotImplementedException();
    }

    public ReadUsersResponse ReadUsers()
    {
        throw new NotImplementedException();
    }

    public UpdateUserResponse UpdateUser(int id, UpdateUserRequest request)
    {
        throw new NotImplementedException();
    }

    public DeleteUserResponse DeleteUser(int id)
    {
        throw new NotImplementedException();
    }
}
