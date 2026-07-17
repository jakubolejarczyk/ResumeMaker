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

    public RepositoryDTO<SocialMedia> Read(int id)
    {
        var socialMedia = store.Data.FirstOrDefault(s => s.Id == id);
        if (socialMedia == null)
        {
            return new RepositoryDTO<SocialMedia>
            {
                Success = false,
                Message = "Failed to retrieve the social media."
            };
        }
        return new RepositoryDTO<SocialMedia>
        {
            Success = true,
            Message = "Successfully retrieved the social media.",
            Body = socialMedia
        };
    }

    public RepositoryDTO<List<SocialMedia>> ReadAll()
    {
        var socialMedias = store.Data;
        return new RepositoryDTO<List<SocialMedia>>
        {
            Success = true,
            Message = $"Successfully retrieved {socialMedias.Count} social medias.",
            Body = socialMedias
        };
    }

    public RepositoryDTO<SocialMedia> Update(int id, SocialMedia socialMedia)
    {
        var currentSocialMedia = store.Data.FirstOrDefault(s => s.Id == id);
        if (currentSocialMedia == null)
        {
            return new RepositoryDTO<SocialMedia>
            {
                Success = false,
                Message = "Failed to update the social media because it does not exist."
            };
        }
        if (currentSocialMedia.Id != socialMedia.Id)
        {
            return new RepositoryDTO<SocialMedia>
            {
                Success = false,
                Message = "Failed to update the social media due to an internal error."
            };
        }
        currentSocialMedia.Label = socialMedia.Label;
        currentSocialMedia.Link = socialMedia.Link;
        currentSocialMedia.Order = socialMedia.Order;
        store.Data = store.Data.Select(s => s.Id == id ? currentSocialMedia : s).ToList();
        return new RepositoryDTO<SocialMedia>
        {
            Success = true,
            Message = "Successfully updated the social media.",
            Body = currentSocialMedia
        };
    }

    public RepositoryDTO<SocialMedia> Delete(int id)
    {
        var socialMedia = store.Data.FirstOrDefault(s => s.Id == id);
        if (socialMedia == null)
        {
            return new RepositoryDTO<SocialMedia>
            {
                Success = false,
                Message = "Failed to delete the social media because it does not exist."
            };
        }
        store.Data.Remove(socialMedia);
        return new RepositoryDTO<SocialMedia>
        {
            Success = true,
            Message = "Successfully deleted the social media.",
            Body = socialMedia
        };
    }
}
