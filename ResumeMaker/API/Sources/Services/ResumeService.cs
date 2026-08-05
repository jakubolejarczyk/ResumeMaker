using API.Sources.Cores;
using API.Sources.Entities;
using API.Sources.Repositories;
using API.Sources.Requests;
using API.Sources.Responses;

namespace API.Sources.Services;

public class ResumeService(
    IResumeRepository resumeRepository,
    ISocialMediaRepository socialMediaRepository,
    IEducationRepository educationRepository,
    IExperienceRepository experienceRepository,
    IExperienceDescriptionRepository experienceDescriptionRepository,
    ISkillGroupRepository skillGroupRepository,
    ISkillElementRepository skillElementRepository
) : IResumeService
{
    public ResponseCore<ResumeResponse> Create(ResumeRequest request)
    {
        var resumeToCreate = new Resume
        {
            Name = request.Name,
            JobTitle = request.JobTitle,
            Description = request.Description,
            UserId = request.UserId
        };
        var resume = resumeRepository.Create(resumeToCreate);
        var resumeBody = resume.Body;
        var socialMediaResponses = ProcessSocialMedias(request.SocialMedias);
        var educationResponses = ProcessEducations(request.Educations);
        var experienceResponses = ProcessExperiences(request.Experiences);
        var skillGroupResponses = ProcessSkillGroups(request.SkillGroups);
        return new ResponseCore<ResumeResponse>
        {
            Success = resume.Success,
            Message = resume.Message,
            Body = resumeBody == null ? null : new ResumeResponse
            {
                Id = resumeBody.Id,
                Name = resumeBody.Name,
                JobTitle = resumeBody.JobTitle,
                Description = resumeBody.Description,
                UserId = resumeBody.UserId,
                SocialMedias = socialMediaResponses,
                Educations = educationResponses,
                Experiences = experienceResponses,
                SkillGroups = skillGroupResponses
            }
        };
    }

    public ResponseCore<ResumeResponse> Read(int id)
    {
        var resume = resumeRepository.Read(id);
        var body = resume.Body;
        return new ResponseCore<ResumeResponse>
        {
            Success = resume.Success,
            Message = resume.Message,
            Body = body == null ? null : new ResumeResponse
            {
                Id = body.Id,
                Name = body.Name,
                JobTitle = body.JobTitle,
                Description = body.Description,
                UserId = body.UserId,
                SocialMedias = (socialMediaRepository.ReadAllForResume(body.Id).Body ?? []).Select(s => new ResumeResponse.SocialMediaResponse
                {
                    Id = s.Id,
                    Label = s.Label,
                    Link = s.Link,
                    Order = s.Order,
                    ResumeId = s.ResumeId
                }).ToList(),
                Educations = (educationRepository.ReadAllForResume(body.Id).Body ?? []).Select(e => new ResumeResponse.EducationResponse
                {
                    Id = e.Id,
                    InstitutionName = e.InstitutionName,
                    FieldOfStudy = e.FieldOfStudy,
                    Degree = e.Degree,
                    GraduationYear = e.GraduationYear,
                    ResumeId = e.ResumeId
                }).ToList(),
                Experiences = (experienceRepository.ReadAllForResume(body.Id).Body ?? []).Select(ex => new ResumeResponse.ExperienceResponse
                {
                    Id = ex.Id,
                    CompanyName = ex.CompanyName,
                    JobTitle = ex.JobTitle,
                    StartDate = ex.StartDate,
                    EndDate = ex.EndDate,
                    ResumeId = ex.ResumeId,
                    ExperienceDescriptions = (experienceDescriptionRepository.ReadAllForExperience(ex.Id).Body ?? []).Select(ed => new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
                    {
                        Id = ed.Id,
                        Description = ed.Description,
                        Order = ed.Order,
                        ExperienceId = ed.ExperienceId
                    }).ToList(),
                }).ToList(),
                SkillGroups = (skillGroupRepository.ReadAllForResume(body.Id).Body ?? []).Select(sg => new ResumeResponse.SkillGroupResponse
                {
                    Id = sg.Id,
                    Name = sg.Name,
                    Order = sg.Order,
                    ResumeId = sg.ResumeId,
                    SkillElements = (skillElementRepository.ReadAllForSkillGroup(sg.Id).Body ?? []).Select(se => new ResumeResponse.SkillGroupResponse.SkillElementResponse
                    {
                        Id = se.Id,
                        Name = se.Name,
                        Order = se.Order,
                        SkillGroupId = se.SkillGroupId
                    }).ToList(),
                }).ToList(),
            }
        };
    }

    public ResponseCore<List<ResumeResponse>> ReadAllForUser(int userId)
    {
        var resume = resumeRepository.ReadAllForUser(userId);
        var body = resume.Body;
        return new ResponseCore<List<ResumeResponse>>
        {
            Success = resume.Success,
            Message = resume.Message,
            Body = body == null ? null : body
                .Select(r => new ResumeResponse
                {
                    Id = r.Id,
                    Name = r.Name,
                    JobTitle = r.JobTitle,
                    Description = r.Description,
                    UserId = r.UserId,
                    SocialMedias = (socialMediaRepository.ReadAllForResume(r.Id).Body ?? []).Select(s => new ResumeResponse.SocialMediaResponse
                    {
                        Id = s.Id,
                        Label = s.Label,
                        Link = s.Link,
                        Order = s.Order,
                        ResumeId = s.ResumeId
                    }).ToList(),
                    Educations = (educationRepository.ReadAllForResume(r.Id).Body ?? []).Select(e => new ResumeResponse.EducationResponse
                    {
                        Id = e.Id,
                        InstitutionName = e.InstitutionName,
                        FieldOfStudy = e.FieldOfStudy,
                        Degree = e.Degree,
                        GraduationYear = e.GraduationYear,
                        ResumeId = e.ResumeId
                    }).ToList(),
                    Experiences = (experienceRepository.ReadAllForResume(r.Id).Body ?? []).Select(ex => new ResumeResponse.ExperienceResponse
                    {
                        Id = ex.Id,
                        CompanyName = ex.CompanyName,
                        JobTitle = ex.JobTitle,
                        StartDate = ex.StartDate,
                        EndDate = ex.EndDate,
                        ResumeId = ex.ResumeId,
                        ExperienceDescriptions = (experienceDescriptionRepository.ReadAllForExperience(ex.Id).Body ?? []).Select(ed => new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
                        {
                            Id = ed.Id,
                            Description = ed.Description,
                            Order = ed.Order,
                            ExperienceId = ed.ExperienceId
                        }).ToList(),
                    }).ToList(),
                    SkillGroups = (skillGroupRepository.ReadAllForResume(r.Id).Body ?? []).Select(sg => new ResumeResponse.SkillGroupResponse
                    {
                        Id = sg.Id,
                        Name = sg.Name,
                        Order = sg.Order,
                        ResumeId = sg.ResumeId,
                        SkillElements = (skillElementRepository.ReadAllForSkillGroup(sg.Id).Body ?? []).Select(se => new ResumeResponse.SkillGroupResponse.SkillElementResponse
                        {
                            Id = se.Id,
                            Name = se.Name,
                            Order = se.Order,
                            SkillGroupId = se.SkillGroupId
                        }).ToList(),
                    }).ToList(),
                })
                .ToList()
        };
    }

    public ResponseCore<ResumeResponse> Update(int id, ResumeRequest request)
    {
        var resumeToUpdate = new Resume
        {
            Id = id,
            Name = request.Name,
            JobTitle = request.JobTitle,
            Description = request.Description,
            UserId = request.UserId
        };
        var resume = resumeRepository.Update(id, resumeToUpdate);
        var resumeBody = resume.Body;
        var socialMediaResponses = ProcessSocialMedias(request.SocialMedias);
        var educationResponses = ProcessEducations(request.Educations);
        var experienceResponses = ProcessExperiences(request.Experiences);
        var skillGroupResponses = ProcessSkillGroups(request.SkillGroups);
        return new ResponseCore<ResumeResponse>
        {
            Success = resume.Success,
            Message = resume.Message,
            Body = resumeBody == null ? null : new ResumeResponse
            {
                Id = resumeBody.Id,
                Name = resumeBody.Name,
                JobTitle = resumeBody.JobTitle,
                Description = resumeBody.Description,
                UserId = resumeBody.UserId,
                SocialMedias = socialMediaResponses,
                Educations = educationResponses,
                Experiences = experienceResponses,
                SkillGroups = skillGroupResponses
            }
        };
    }

    public ResponseCore<ResumeResponse> Delete(int id)
    {
        var resume = resumeRepository.Delete(id);
        return new ResponseCore<ResumeResponse>
        {
            Success = resume.Success,
            Message = resume.Message
        };
    }

    private List<ResumeResponse.SocialMediaResponse> ProcessSocialMedias(List<ResumeRequest.SocialMediaRequest> socialMediaRequests)
    {
        List<ResumeResponse.SocialMediaResponse> socialMediaResponses = [];
        foreach (var socialMediaRequest in socialMediaRequests)
        {
            var socialMedia = new SocialMedia
            {
                Label = socialMediaRequest.Label,
                Link = socialMediaRequest.Link,
                Order = socialMediaRequest.Order,
                ResumeId = socialMediaRequest.ResumeId
            };
            ResponseCore<SocialMedia> socialMediaResponse;
            switch (socialMediaRequest.Operation.ToLower())
            {
                case "create":
                    socialMediaResponse = socialMediaRepository.Create(socialMedia);
                    break;
                case "update":
                    socialMediaResponse = socialMediaRepository.Update(socialMediaRequest.Id, socialMedia);
                    break;
                case "delete":
                    socialMediaResponse = socialMediaRepository.Delete(socialMediaRequest.Id);
                    break;
                default:
                    throw new InvalidOperationException($"Invalid operation: {socialMediaRequest.Operation}");
            }
            if (socialMediaResponse.Success && socialMediaResponse.Body != null)
            {
                socialMediaResponses.Add(new ResumeResponse.SocialMediaResponse
                {
                    Id = socialMediaResponse.Body.Id,
                    Label = socialMediaResponse.Body.Label,
                    Link = socialMediaResponse.Body.Link,
                    Order = socialMediaResponse.Body.Order,
                    ResumeId = socialMediaResponse.Body.ResumeId
                });
            }
        }
        return socialMediaResponses;
    }

    private List<ResumeResponse.EducationResponse> ProcessEducations(List<ResumeRequest.EducationRequest> educationRequests)
    {
        List<ResumeResponse.EducationResponse> educationResponses = [];
        foreach (var educationRequest in educationRequests)
        {
            var education = new Education
            {
                InstitutionName = educationRequest.InstitutionName,
                FieldOfStudy = educationRequest.FieldOfStudy,
                Degree = educationRequest.Degree,
                GraduationYear = educationRequest.GraduationYear,
                ResumeId = educationRequest.ResumeId
            };
            ResponseCore<Education> educationResponse;
            switch (educationRequest.Operation.ToLower())
            {
                case "create":
                    educationResponse = educationRepository.Create(education);
                    break;
                case "update":
                    educationResponse = educationRepository.Update(educationRequest.Id, education);
                    break;
                case "delete":
                    educationResponse = educationRepository.Delete(educationRequest.Id);
                    break;
                default:
                    throw new InvalidOperationException($"Invalid operation: {educationRequest.Operation}");
            }
            if (educationResponse.Success && educationResponse.Body != null)
            {
                educationResponses.Add(new ResumeResponse.EducationResponse
                {
                    Id = educationResponse.Body.Id,
                    InstitutionName = educationResponse.Body.InstitutionName,
                    FieldOfStudy = educationResponse.Body.FieldOfStudy,
                    Degree = educationResponse.Body.Degree,
                    GraduationYear = educationResponse.Body.GraduationYear,
                    ResumeId = educationResponse.Body.ResumeId
                });
            }
        }
        return educationResponses;
    }

    private List<ResumeResponse.ExperienceResponse> ProcessExperiences(List<ResumeRequest.ExperienceRequest> experienceRequests)
    {
        List<ResumeResponse.ExperienceResponse> experienceResponses = [];
        foreach (var experienceRequest in experienceRequests)
        {
            var experience = new Experience
            {
                CompanyName = experienceRequest.CompanyName,
                JobTitle = experienceRequest.JobTitle,
                StartDate = experienceRequest.StartDate,
                EndDate = experienceRequest.EndDate,
                ResumeId = experienceRequest.ResumeId
            };
            ResponseCore<Experience> experienceResponse;
            switch (experienceRequest.Operation.ToLower())
            {
                case "create":
                    experienceResponse = experienceRepository.Create(experience);
                    break;
                case "update":
                    experienceResponse = experienceRepository.Update(experienceRequest.Id, experience);
                    break;
                case "delete":
                    experienceResponse = experienceRepository.Delete(experienceRequest.Id);
                    break;
                default:
                    throw new InvalidOperationException($"Invalid operation: {experienceRequest.Operation}");
            }
            if (experienceResponse.Success && experienceResponse.Body != null)
            {
                experienceResponses.Add(new ResumeResponse.ExperienceResponse
                {
                    Id = experienceResponse.Body.Id,
                    CompanyName = experienceResponse.Body.CompanyName,
                    JobTitle = experienceResponse.Body.JobTitle,
                    StartDate = experienceResponse.Body.StartDate,
                    EndDate = experienceResponse.Body.EndDate,
                    ResumeId = experienceResponse.Body.ResumeId,
                    ExperienceDescriptions = ProcessExperienceDescriptions(experienceRequest.ExperienceDescriptions)
                });
            }
        }
        return experienceResponses;
    }

    private List<ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse> ProcessExperienceDescriptions(List<ResumeRequest.ExperienceRequest.ExperienceDescriptionRequest> experienceDescriptionRequests)
    {
        List<ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse> experienceDescriptionResponses = [];
        foreach (var experienceDescriptionRequest in experienceDescriptionRequests)
        {
            var experienceDescription = new ExperienceDescription
            {
                Description = experienceDescriptionRequest.Description,
                Order = experienceDescriptionRequest.Order,
                ExperienceId = experienceDescriptionRequest.ExperienceId
            };
            ResponseCore<ExperienceDescription> experienceDescriptionResponse;
            switch (experienceDescriptionRequest.Operation.ToLower())
            {
                case "create":
                    experienceDescriptionResponse = experienceDescriptionRepository.Create(experienceDescription);
                    break;
                case "update":
                    experienceDescriptionResponse = experienceDescriptionRepository.Update(experienceDescriptionRequest.Id, experienceDescription);
                    break;
                case "delete":
                    experienceDescriptionResponse = experienceDescriptionRepository.Delete(experienceDescriptionRequest.Id);
                    break;
                default:
                    throw new InvalidOperationException($"Invalid operation: {experienceDescriptionRequest.Operation}");
            }
            if (experienceDescriptionResponse.Success && experienceDescriptionResponse.Body != null)
            {
                experienceDescriptionResponses.Add(new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
                {
                    Id = experienceDescriptionResponse.Body.Id,
                    Description = experienceDescriptionResponse.Body.Description,
                    Order = experienceDescriptionResponse.Body.Order,
                    ExperienceId = experienceDescriptionResponse.Body.ExperienceId
                });
            }
        }
        return experienceDescriptionResponses;
    }

    private List<ResumeResponse.SkillGroupResponse> ProcessSkillGroups(List<ResumeRequest.SkillGroupRequest> skillGroupRequests)
    {
        List<ResumeResponse.SkillGroupResponse> skillGroupResponses = [];
        foreach (var skillGroupRequest in skillGroupRequests)
        {
            var skillGroup = new SkillGroup
            {
                Name = skillGroupRequest.Name,
                Order = skillGroupRequest.Order,
                ResumeId = skillGroupRequest.ResumeId
            };
            ResponseCore<SkillGroup> skillGroupResponse;
            switch (skillGroupRequest.Operation.ToLower())
            {
                case "create":
                    skillGroupResponse = skillGroupRepository.Create(skillGroup);
                    break;
                case "update":
                    skillGroupResponse = skillGroupRepository.Update(skillGroupRequest.Id, skillGroup);
                    break;
                case "delete":
                    skillGroupResponse = skillGroupRepository.Delete(skillGroupRequest.Id);
                    break;
                default:
                    throw new InvalidOperationException($"Invalid operation: {skillGroupRequest.Operation}");
            }
            if (skillGroupResponse.Success && skillGroupResponse.Body != null)
            {
                skillGroupResponses.Add(new ResumeResponse.SkillGroupResponse
                {
                    Id = skillGroupResponse.Body.Id,
                    Name = skillGroupResponse.Body.Name,
                    Order = skillGroupResponse.Body.Order,
                    ResumeId = skillGroupResponse.Body.ResumeId,
                    SkillElements = ProcessSkillElements(skillGroupRequest.SkillElements)
                });
            }
        }
        return skillGroupResponses;
    }

    private List<ResumeResponse.SkillGroupResponse.SkillElementResponse> ProcessSkillElements(List<ResumeRequest.SkillGroupRequest.SkillElementRequest> skillElementRequests)
    {
        List<ResumeResponse.SkillGroupResponse.SkillElementResponse> skillElementResponses = [];
        foreach (var skillElementRequest in skillElementRequests)
        {
            var skillElement = new SkillElement
            {
                Name = skillElementRequest.Name,
                Order = skillElementRequest.Order,
                SkillGroupId = skillElementRequest.SkillGroupId
            };
            ResponseCore<SkillElement> skillElementResponse;
            switch (skillElementRequest.Operation.ToLower())
            {
                case "create":
                    skillElementResponse = skillElementRepository.Create(skillElement);
                    break;
                case "update":
                    skillElementResponse = skillElementRepository.Update(skillElementRequest.Id, skillElement);
                    break;
                case "delete":
                    skillElementResponse = skillElementRepository.Delete(skillElementRequest.Id);
                    break;
                default:
                    throw new InvalidOperationException($"Invalid operation: {skillElementRequest.Operation}");
            }
            if (skillElementResponse.Success && skillElementResponse.Body != null)
            {
                skillElementResponses.Add(new ResumeResponse.SkillGroupResponse.SkillElementResponse
                {
                    Id = skillElementResponse.Body.Id,
                    Name = skillElementResponse.Body.Name,
                    Order = skillElementResponse.Body.Order,
                    SkillGroupId = skillElementResponse.Body.SkillGroupId,
                });
            }
        }
        return skillElementResponses;
    }
}
