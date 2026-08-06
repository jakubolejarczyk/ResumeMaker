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
        if (resumeBody == null)
        {
            return new ResponseCore<ResumeResponse>
            {
                Success = resume.Success,
                Message = resume.Message,
                Body = null
            };
        }
        var socialMediaResponses = ProcessSocialMedias(request.SocialMedias, resumeBody.Id);
        var educationResponses = ProcessEducations(request.Educations, resumeBody.Id);
        var experienceResponses = ProcessExperiences(request.Experiences, resumeBody.Id);
        var skillGroupResponses = ProcessSkillGroups(request.SkillGroups, resumeBody.Id);
        return new ResponseCore<ResumeResponse>
        {
            Success = resume.Success,
            Message = resume.Message,
            Body = new ResumeResponse
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
                    Order = e.Order,
                    ResumeId = e.ResumeId
                }).ToList(),
                Experiences = (experienceRepository.ReadAllForResume(body.Id).Body ?? []).Select(ex => new ResumeResponse.ExperienceResponse
                {
                    Id = ex.Id,
                    CompanyName = ex.CompanyName,
                    JobTitle = ex.JobTitle,
                    StartDate = ex.StartDate,
                    EndDate = ex.EndDate,
                    Order = ex.Order,
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
                        Order = e.Order,
                        ResumeId = e.ResumeId
                    }).ToList(),
                    Experiences = (experienceRepository.ReadAllForResume(r.Id).Body ?? []).Select(ex => new ResumeResponse.ExperienceResponse
                    {
                        Id = ex.Id,
                        CompanyName = ex.CompanyName,
                        JobTitle = ex.JobTitle,
                        StartDate = ex.StartDate,
                        EndDate = ex.EndDate,
                        Order = ex.Order,
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
        if (resumeBody == null)
        {
            return new ResponseCore<ResumeResponse>
            {
                Success = resume.Success,
                Message = resume.Message,
                Body = null
            };
        }
        var socialMediaResponses = ProcessSocialMedias(request.SocialMedias, resumeBody.Id);
        var educationResponses = ProcessEducations(request.Educations, resumeBody.Id);
        var experienceResponses = ProcessExperiences(request.Experiences, resumeBody.Id);
        var skillGroupResponses = ProcessSkillGroups(request.SkillGroups, resumeBody.Id);
        return new ResponseCore<ResumeResponse>
        {
            Success = resume.Success,
            Message = resume.Message,
            Body = new ResumeResponse
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

    private List<ResumeResponse.SocialMediaResponse> ProcessSocialMedias(List<ResumeRequest.SocialMediaRequest> socialMediaRequests, int resumeId)
    {
        List<ResumeResponse.SocialMediaResponse> socialMediaResponses = [];
        foreach (var socialMediaRequest in socialMediaRequests)
        {
            var socialMedia = new SocialMedia
            {
                Label = socialMediaRequest.Label,
                Link = socialMediaRequest.Link,
                Order = socialMediaRequest.Order,
                ResumeId = resumeId
            };
            ResponseCore<SocialMedia> socialMediaResponse;
            if (socialMediaRequest.Id.HasValue)
            {
                socialMediaResponse = socialMediaRepository.Update(socialMediaRequest.Id.Value, socialMedia);
            }
            else
            {
                socialMediaResponse = socialMediaRepository.Create(socialMedia);
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
        foreach (var socialMediaRequest in socialMediaRequests)
        {
            var body = socialMediaRepository.ReadAllForResume(resumeId).Body;
            if (body == null) continue;
            body.Where(b => !socialMediaResponses.Any(r => r.Id == b.Id))
                .ToList()
                .ForEach(s => socialMediaRepository.Delete(s.Id));
        }
        return socialMediaResponses;
    }

    private List<ResumeResponse.EducationResponse> ProcessEducations(List<ResumeRequest.EducationRequest> educationRequests, int resumeId)
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
                Order = educationRequest.Order,
                ResumeId = resumeId
            };
            ResponseCore<Education> educationResponse;
            if (educationRequest.Id.HasValue)
            {
                educationResponse = educationRepository.Update(educationRequest.Id.Value, education);
            }
            else
            {
                educationResponse = educationRepository.Create(education);
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
                    Order = educationResponse.Body.Order,
                    ResumeId = educationResponse.Body.ResumeId
                });
            }
        }
        foreach (var educationRequest in educationRequests)
        {
            var body = educationRepository.ReadAllForResume(resumeId).Body;
            if (body == null) continue;
            body.Where(b => !educationResponses.Any(r => r.Id == b.Id))
                .ToList()
                .ForEach(e => educationRepository.Delete(e.Id));
        }
        return educationResponses;
    }

    private List<ResumeResponse.ExperienceResponse> ProcessExperiences(List<ResumeRequest.ExperienceRequest> experienceRequests, int resumeId)
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
                Order = experienceRequest.Order,
                ResumeId = resumeId
            };
            ResponseCore<Experience> experienceResponse;
            if (experienceRequest.Id.HasValue)
            {
                experienceResponse = experienceRepository.Update(experienceRequest.Id.Value, experience);
            }
            else
            {
                experienceResponse = experienceRepository.Create(experience);
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
                    Order = experienceResponse.Body.Order,
                    ExperienceDescriptions = ProcessExperienceDescriptions(experienceRequest.ExperienceDescriptions, experienceResponse.Body.Id)
                });
            }
        }
        foreach (var experienceRequest in experienceRequests)
        {
            var body = experienceRepository.ReadAllForResume(resumeId).Body;
            if (body == null) continue;
            body.Where(b => !experienceResponses.Any(r => r.Id == b.Id))
                .ToList()
                .ForEach(e => experienceRepository.Delete(e.Id));
        }
        return experienceResponses;
    }

    private List<ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse> ProcessExperienceDescriptions(List<ResumeRequest.ExperienceRequest.ExperienceDescriptionRequest> experienceDescriptionRequests, int experienceId)
    {
        List<ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse> experienceDescriptionResponses = [];
        foreach (var experienceDescriptionRequest in experienceDescriptionRequests)
        {
            var experienceDescription = new ExperienceDescription
            {
                Description = experienceDescriptionRequest.Description,
                Order = experienceDescriptionRequest.Order,
                ExperienceId = experienceId
            };
            ResponseCore<ExperienceDescription> experienceDescriptionResponse;
            if (experienceDescriptionRequest.Id.HasValue)
            {
                experienceDescriptionResponse = experienceDescriptionRepository.Update(experienceDescriptionRequest.Id.Value, experienceDescription);
            }
            else
            {
                experienceDescriptionResponse = experienceDescriptionRepository.Create(experienceDescription);
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
        foreach (var experienceDescriptionRequest in experienceDescriptionRequests)
        {
            var body = experienceDescriptionRepository
                .ReadAllForExperience(experienceId)
                .Body;
            if (body == null) continue;
            body.Where(b => !experienceDescriptionResponses.Any(r => r.Id == b.Id))
                .ToList()
                .ForEach(d => experienceDescriptionRepository.Delete(d.Id));
        }
        return experienceDescriptionResponses;
    }

    private List<ResumeResponse.SkillGroupResponse> ProcessSkillGroups(List<ResumeRequest.SkillGroupRequest> skillGroupRequests, int resumeId)
    {
        List<ResumeResponse.SkillGroupResponse> skillGroupResponses = [];
        foreach (var skillGroupRequest in skillGroupRequests)
        {
            var skillGroup = new SkillGroup
            {
                Name = skillGroupRequest.Name,
                Order = skillGroupRequest.Order,
                ResumeId = resumeId
            };
            ResponseCore<SkillGroup> skillGroupResponse;
            if (skillGroupRequest.Id.HasValue)
            {
                skillGroupResponse = skillGroupRepository.Update(skillGroupRequest.Id.Value, skillGroup);
            }
            else
            {
                skillGroupResponse = skillGroupRepository.Create(skillGroup);
            }
            if (skillGroupResponse.Success && skillGroupResponse.Body != null)
            {
                skillGroupResponses.Add(new ResumeResponse.SkillGroupResponse
                {
                    Id = skillGroupResponse.Body.Id,
                    Name = skillGroupResponse.Body.Name,
                    Order = skillGroupResponse.Body.Order,
                    ResumeId = skillGroupResponse.Body.ResumeId,
                    SkillElements = ProcessSkillElements(skillGroupRequest.SkillElements, skillGroupResponse.Body.Id)
                });
            }
        }
        foreach (var skillGroupRequest in skillGroupRequests)
        {
            var body = skillGroupRepository.ReadAllForResume(resumeId).Body;
            if (body == null) continue;
            body.Where(b => !skillGroupResponses.Any(r => r.Id == b.Id))
                .ToList()
                .ForEach(s => skillGroupRepository.Delete(s.Id));
        }
        return skillGroupResponses;
    }

    private List<ResumeResponse.SkillGroupResponse.SkillElementResponse> ProcessSkillElements(List<ResumeRequest.SkillGroupRequest.SkillElementRequest> skillElementRequests, int skillGroupId)
    {
        List<ResumeResponse.SkillGroupResponse.SkillElementResponse> skillElementResponses = [];
        foreach (var skillElementRequest in skillElementRequests)
        {
            var skillElement = new SkillElement
            {
                Name = skillElementRequest.Name,
                Order = skillElementRequest.Order,
                SkillGroupId = skillGroupId
            };
            ResponseCore<SkillElement> skillElementResponse;
            if (skillElementRequest.Id.HasValue)
            {
                skillElementResponse = skillElementRepository.Update(skillElementRequest.Id.Value, skillElement);
            }
            else
            {
                skillElementResponse = skillElementRepository.Create(skillElement);
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
        foreach (var skillElementRequest in skillElementRequests)
        {
            var body = skillElementRepository.ReadAllForSkillGroup(skillGroupId).Body;
            if (body == null) continue;

            body.Where(b => !skillElementResponses.Any(r => r.Id == b.Id))
                .ToList()
                .ForEach(s => skillElementRepository.Delete(s.Id));
        }
        return skillElementResponses;
    }
}
