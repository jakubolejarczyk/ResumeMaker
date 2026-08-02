using API.Sources.Contexts;
using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public class SocialMediaRepository(AppDbContext context) : ISocialMediaRepository
{
    public ResponseCore<SocialMedia> Create(SocialMedia socialMedia)
    {
        context.SocialMedias.Add(socialMedia);
        context.SaveChanges();
        return new ResponseCore<SocialMedia>
        {
            Success = true,
            Message = "The social media was created successfully.",
            Body = socialMedia
        };
    }

    public ResponseCore<SocialMedia> Read(int id)
    {
        var socialMedia = context.SocialMedias.FirstOrDefault(s => s.Id == id);
        if (socialMedia == null)
        {
            return new ResponseCore<SocialMedia>
            {
                Success = false,
                Message = "Failed to retrieve the social media."
            };
        }
        return new ResponseCore<SocialMedia>
        {
            Success = true,
            Message = "Successfully retrieved the social media.",
            Body = socialMedia
        };
    }

    public ResponseCore<List<SocialMedia>> ReadAllForResume(int resumeId)
    {
        var socialMedias = context.SocialMedias.Where(s => s.ResumeId == resumeId).ToList();
        if (socialMedias.Count > 0)
        {
            return new ResponseCore<List<SocialMedia>>
            {
                Success = true,
                Message = $"Successfully retrieved {socialMedias.Count} social medias.",
                Body = socialMedias
            };
        }
        return new ResponseCore<List<SocialMedia>>
        {
            Success = false,
            Message = "No social medias found."
        };
    }

    public ResponseCore<SocialMedia> Update(int id, SocialMedia socialMedia)
    {
        var socialMediaById = context.SocialMedias.FirstOrDefault(s => s.Id == id);
        if (socialMediaById == null)
        {
            return new ResponseCore<SocialMedia>
            {
                Success = false,
                Message = "Failed to update the social media because it does not exist."
            };
        }
        socialMediaById.Label = socialMedia.Label;
        socialMediaById.Link = socialMedia.Link;
        socialMediaById.Order = socialMedia.Order;
        context.SocialMedias.Update(socialMediaById);
        context.SaveChanges();
        return new ResponseCore<SocialMedia>
        {
            Success = true,
            Message = "Successfully updated the social media.",
            Body = socialMediaById
        };
    }

    public ResponseCore<SocialMedia> Delete(int id)
    {
        var socialMedia = context.SocialMedias.FirstOrDefault(s => s.Id == id);
        if (socialMedia == null)
        {
            return new ResponseCore<SocialMedia>
            {
                Success = false,
                Message = $"Failed to delete social media because social media with ID {id} does not exist."
            };
        }
        context.SocialMedias.Remove(socialMedia);
        context.SaveChanges();
        return new ResponseCore<SocialMedia>
        {
            Success = true,
            Message = $"Social media with ID {id} has been deleted successfully.",
            Body = socialMedia
        };
    }
}
