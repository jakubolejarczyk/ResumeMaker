using API.Sources.DTOs;
using API.Sources.Entities;
using API.Sources.Stores;

namespace API.Sources.Repositories.SkillElements;

public class SkillElementRepository(SkillElementStore store) : ISkillElementRepository
{
    public RepositoryDTO<SkillElement> Create(SkillElement skillElement)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillElement> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillElement> Read(int id)
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<List<SkillElement>> ReadAll()
    {
        throw new NotImplementedException();
    }

    public RepositoryDTO<SkillElement> Update(int id, SkillElement skillElement)
    {
        throw new NotImplementedException();
    }
}
