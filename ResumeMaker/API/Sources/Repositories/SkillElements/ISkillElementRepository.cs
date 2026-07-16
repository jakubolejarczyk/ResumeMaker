using API.Sources.DTOs;
using API.Sources.Entities;

namespace API.Sources.Repositories.SkillElements;

public interface ISkillElementRepository
{
    RepositoryDTO<SkillElement> Create(SkillElement skillElement);

    RepositoryDTO<SkillElement> Read(int id);

    RepositoryDTO<List<SkillElement>> ReadAll();

    RepositoryDTO<SkillElement> Update(int id, SkillElement skillElement);

    RepositoryDTO<SkillElement> Delete(int id);
}
