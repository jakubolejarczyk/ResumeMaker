using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.SocialMedias;

public class SocialMediaRepository(SocialMediaStore store) : ISocialMediaRepository
{
    public RepositoryDTO<SocialMedia> Create(SocialMedia socialMedia)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SocialMedia> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SocialMedia> Read(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<SocialMedia>> ReadAll()
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SocialMedia> Update(int id, SocialMedia socialMedia)
    {
        throw new NotImplementedException();
    }
}
