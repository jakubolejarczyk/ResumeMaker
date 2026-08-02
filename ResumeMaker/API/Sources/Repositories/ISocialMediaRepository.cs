using API.Sources.Cores;
using API.Sources.Entities;

namespace API.Sources.Repositories;

public interface ISocialMediaRepository
{
    ResponseCore<SocialMedia> Create(SocialMedia socialMedia);

    ResponseCore<SocialMedia> Read(int id);

    ResponseCore<List<SocialMedia>> ReadAllForResume(int resumeId);

    ResponseCore<SocialMedia> Update(int id, SocialMedia socialMedia);

    ResponseCore<SocialMedia> Delete(int id);
}
