using API.Sources.Cores;
using API.Sources.Entities;
using API.Sources.Repositories;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services.Users;

public class UserService(IUserRepository repository) : IUserService
{
    public ResponseCore<UserResponse> Create(UserRequest request)
    {
        var userToCreate = new User
        {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            City = request.City,
            Country = request.Country,
            PhoneNumber = request.PhoneNumber
        };
        var user = repository.Create(userToCreate);
        var body = user.Body;
        return new ResponseCore<UserResponse>
        {
            Success = user.Success,
            Message = user.Message,
            Body = body == null ? null : new UserResponse
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

    public ResponseCore<UserResponse> Read(int id)
    {
        var user = repository.Read(id);
        var body = user.Body;
        return new ResponseCore<UserResponse>
        {
            Success = user.Success,
            Message = user.Message,
            Body = body == null ? null : new UserResponse
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

    public ResponseCore<List<UserResponse>> ReadAll()
    {
        var user = repository.ReadAll();
        var body = user.Body;
        return new ResponseCore<List<UserResponse>>
        {
            Success = user.Success,
            Message = user.Message,
            Body = body == null ? null : body
                .Select(b => new UserResponse
                {
                    Id = b.Id,
                    Email = b.Email,
                    FirstName = b.FirstName,
                    LastName = b.LastName,
                    City = b.City,
                    Country = b.Country,
                    PhoneNumber = b.PhoneNumber
                })
                .ToList()
        };
    }

    public ResponseCore<UserResponse> Update(int id, UserRequest request)
    {
        var userToUpdate = new User
        {
            Id = id,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            City = request.City,
            Country = request.Country,
            PhoneNumber = request.PhoneNumber
        };
        var user = repository.Update(userToUpdate);
        var body = user.Body;
        return new ResponseCore<UserResponse>
        {
            Success = user.Success,
            Message = user.Message,
            Body = body == null ? null : new UserResponse
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

    public ResponseCore<UserResponse> Delete(int id)
    {
        var user = repository.Delete(id);
        var body = user.Body;
        return new ResponseCore<UserResponse>
        {
            Success = user.Success,
            Message = user.Message,
            Body = body == null ? null : new UserResponse
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
}
