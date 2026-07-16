using API.Sources.Entities;

namespace API.Sources.Stores;

public class UserStore : IUserStore
{
    public List<User> Users { get; } = [];
}
