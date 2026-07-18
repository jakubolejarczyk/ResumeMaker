using API.Sources.Cores;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Users;

public class UserService : IUserService
{
    public ResponseCore<UserResponse> CreateUser(UserRequest request)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<UserResponse> DeleteUser(int id)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<UserResponse> ReadUser(int id)
    {
        throw new NotImplementedException();
    }

    public ResponseCore<List<UserResponse>> ReadUsers()
    {
        throw new NotImplementedException();
    }

    public ResponseCore<UserResponse> UpdateUser(int id, UserRequest request)
    {
        throw new NotImplementedException();
    }
}
