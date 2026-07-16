using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.SocialMedias;

public interface ISocialMediaRepository
{
    RepositoryDTO<SocialMedia> Create(SocialMedia socialMedia);

    RepositoryDTO<SocialMedia> Read(int id);

    RepositoryDTO<List<SocialMedia>> ReadAll();

    RepositoryDTO<SocialMedia> Update(int id, SocialMedia socialMedia);

    RepositoryDTO<SocialMedia> Delete(int id);
}
