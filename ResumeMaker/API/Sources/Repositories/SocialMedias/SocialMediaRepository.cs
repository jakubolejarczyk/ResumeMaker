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
        var socialMedias = store.Date;
        return new RepositoryDTO<List<SocialMedia>>
        {
            Success = true,
            Message = $"Successfully retrieved {socialMedias.Count} social medias.",
            Body = socialMedias
        };
    }

    public RepositoryDTO<SocialMedia> Update(int id, SocialMedia socialMedia)
    {
        throw new NotImplementedException();
    }
}
