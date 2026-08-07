using Microsoft.AspNetCore.Mvc;

namespace API.Sources.Services;

public interface IGenerateService
{
    FileContentResult Generate(int userId, int companyId, int resumeId);
}
