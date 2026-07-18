using API.Sources.Cores;
using API.Sources.Entities;
using API.Sources.Repositories.Users;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Users;

public class UserService(IUserRepository userRepository) : IUserService
{
    public ResponseCore<UserResponse> CreateUser(UserRequest request)
    {
        var user = new User()
        {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            City = request.City,
            Country = request.Country,
            PhoneNumber = request.PhoneNumber
        };
        var dto = userRepository.Create(user);
        var body = dto.Body;
        return new ResponseCore<UserResponse>
        {
            Success = dto.Success,
            Message = dto.Message,
            Body = body == null ? null : new UserResponse()
            {
                Id = body.Id,
                Email = body.Email,
                FirstName = body.FirstName,
                LastName = body.LastName,
                City = body.City,
                Country = body.Country,
                PhoneNumber = body.PhoneNumber
            }
        };
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
