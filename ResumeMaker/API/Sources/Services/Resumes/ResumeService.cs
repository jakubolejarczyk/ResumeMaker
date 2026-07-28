//using API.Sources.Cores;
//using API.Sources.Entities;
//using API.Sources.Repositories.Educations;
//using API.Sources.Repositories.ExperienceDescriptions;
//using API.Sources.Repositories.Experiences;
//using API.Sources.Repositories.Resumes;
//using API.Sources.Repositories.SkillElements;
//using API.Sources.Repositories.SkillGroups;
//using API.Sources.Repositories.SocialMedias;
//using API.Sources.Requests;
//using API.Sources.Responses;
//using Azure;
//using static API.Sources.Requests.ResumeRequest;

//namespace API.Sources.Services.Resumes;

//public class ResumeService(
//    IResumeRepository resumeRepository,
//    ISocialMediaRepository socialMediaRepository,
//    IEducationRepository educationRepository,
//    IExperienceRepository experienceRepository,
//    IExperienceDescriptionRepository experienceDescriptionRepository,
//    ISkillGroupRepository skillGroupRepository,
//    ISkillElementRepository skillElementRepository) : IResumeService
//{
//    public ResponseCore<ResumeResponse> CreateResume(ResumeRequest request)
//    {
//        // Resume
//        var resume = new Resume()
//        {
//            Name = request.Name,
//            JobTitle = request.JobTitle,
//            Description = request.Description,
//            UserId = request.UserId
//        };
//        var dto = resumeRepository.Create(resume);
//        var resumeBody = dto.Body;
//        // Social medias
//        var socialMedias = request.SocialMedias
//            .Select(s =>
//            {
//                var socialMedia = new SocialMedia
//                {
//                    Label = s.Label,
//                    Link = s.Link,
//                    Order = s.Order,
//                    ResumeId = resume.Id
//                };
//                var response = socialMediaRepository.Create(socialMedia);
//                if (response.Body != null)
//                {
//                    return new ResumeResponse.SocialMediaResponse
//                    {
//                        Id = response.Body.Id,
//                        Label = response.Body.Label,
//                        Link = response.Body.Link,
//                        Order = response.Body.Order,
//                        ResumeId = response.Body.ResumeId
//                    };
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();
//        // Educations
//        var educations = request.Educations
//            .Select(s =>
//            {
//                var educcations = new Education
//                {
//                    InstitutionName = s.InstitutionName,
//                    FieldOfStudy = s.FieldOfStudy,
//                    Degree = s.Degree,
//                    GraduationYear = s.GraduationYear,
//                    ResumeId = resume.Id
//                };
//                var dto = educationRepository.Create(educcations);
//                if (dto.Body != null)
//                {
//                    return new ResumeResponse.EducationResponse
//                    {
//                        Id = dto.Body.Id,
//                        InstitutionName = dto.Body.InstitutionName,
//                        FieldOfStudy = dto.Body.FieldOfStudy,
//                        Degree = dto.Body.Degree,
//                        GraduationYear = dto.Body.GraduationYear,
//                        ResumeId = dto.Body.ResumeId
//                    };
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();
//        var experiences = request.Experiences
//            .Select(s =>
//            {
//                var experiences = new Experience
//                {
//                    CompanyName = s.CompanyName,
//                    JobTitle = s.JobTitle,
//                    StartDate = s.StartDate,
//                    EndDate = s.EndDate,
//                    ResumeId = resume.Id
//                };
//                var dto = experienceRepository.Create(experiences);
//                var experienceBody = dto.Body;
//                if (experienceBody != null)
//                {
//                    var experienceDescriptions = s.ExperienceDescriptions
//                        .Select(e =>
//                        {
//                            var experienceDescription = new ExperienceDescription
//                            {
//                                Description = e.Description,
//                                Order = e.Order,
//                                ExperienceId = experienceBody.Id
//                            };
//                            var dto2 = experienceDescriptionRepository.Create(experienceDescription);
//                            if (dto2.Body != null)
//                            {
//                                return new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
//                                {
//                                    Id = dto2.Body.Id,
//                                    Description = dto2.Body.Description,
//                                    Order = dto2.Body.Order,
//                                    ExperienceId = experienceBody.Id
//                                };
//                            }
//                            throw new Exception("Response can not be empty!");
//                        })
//                        .ToList();
//                    if (dto.Body != null)
//                    {
//                        return new ResumeResponse.ExperienceResponse
//                        {
//                            Id = dto.Body.Id,
//                            CompanyName = dto.Body.CompanyName,
//                            JobTitle = dto.Body.JobTitle,
//                            StartDate = dto.Body.StartDate,
//                            EndDate = dto.Body.EndDate,
//                            ResumeId = dto.Body.ResumeId,
//                            ExperienceDescriptions = experienceDescriptions,
//                        };
//                    }
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();

//        var skillGroups = request.SkillGroups
//            .Select(s =>
//            {
//                var skillGroup = new SkillGroup
//                {
//                    Name = s.Name,
//                    Order = s.Order,
//                    ResumeId = resume.Id,
//                };
//                var dto = skillGroupRepository.Create(skillGroup);
//                var skillGroupBody = dto.Body;
//                if (skillGroupBody != null)
//                {
//                    var skillElements = s.SkillElements
//                        .Select(e =>
//                        {
//                            var skillElement = new SkillElement
//                            {
//                                Name = e.Name,
//                                Order = e.Order,
//                                SkillGroupId = skillGroupBody.Id
//                            };
//                            var dto2 = skillElementRepository.Create(skillElement);
//                            if (dto2.Body != null)
//                            {
//                                return new ResumeResponse.SkillGroupResponse.SkillElementResponse
//                                {
//                                    Id = dto2.Body.Id,
//                                    Name = dto2.Body.Name,
//                                    Order = dto2.Body.Order,
//                                    SkillGroupId = skillGroupBody.Id
//                                };
//                            }
//                            throw new Exception("Response can not be empty!");
//                        })
//                        .ToList();
//                    if (dto.Body != null)
//                    {
//                        return new ResumeResponse.SkillGroupResponse
//                        {
//                            Id = dto.Body.Id,
//                            Name = dto.Body.Name,
//                            Order = dto.Body.Order,
//                            SkillElements = skillElements,
//                            ResumeId = dto.Body.ResumeId
//                        };
//                    }
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();
//        return new ResponseCore<ResumeResponse>
//        {
//            Success = dto.Success,
//            Message = dto.Message,
//            Body = resume == null ? null : new ResumeResponse
//            {
//                Id = resume.Id,
//                Name = resume.Name,
//                JobTitle = resume.JobTitle,
//                Description = resume.Description,
//                SocialMedias = socialMedias,
//                Educations = educations,
//                Experiences = experiences,
//                SkillGroups = skillGroups,
//                UserId = resumeBody?.UserId ?? 0
//            }
//        };
//    }

//    public byte[] GeneratePDFResume(int userId, int companyId, int resumeId)
//    {
//        throw new NotImplementedException();
//    }

//    public ResponseCore<ResumeResponse> ReadResume(int id)
//    {
//        var dto = resumeRepository.Read(id);
//        var body = dto.Body;
//        return new ResponseCore<ResumeResponse>
//        {
//            Success = dto.Success,
//            Message = dto.Message,
//            Body = body == null ? null : new ResumeResponse
//            {
//                Id = body.Id,
//                Name = body.Name,
//                JobTitle = body.JobTitle,
//                Description = body.Description,
//                SocialMedias = body.SocialMedias.Select(i =>
//                {
//                    return new ResumeResponse.SocialMediaResponse
//                    {
//                        Id = i.Id,
//                        Label = i.Label,
//                        Link = i.Link,
//                        Order = i.Order,
//                        ResumeId = i.ResumeId
//                    };
//                }).ToList(),
//                Educations = body.Educations.Select(i =>
//                {
//                    return new ResumeResponse.EducationResponse
//                    {
//                        Id = i.Id,
//                        InstitutionName = i.InstitutionName,
//                        FieldOfStudy = i.FieldOfStudy,
//                        Degree = i.Degree,
//                        GraduationYear = i.GraduationYear,
//                        ResumeId = i.ResumeId
//                    };
//                }).ToList(),
//                Experiences = body.Experiences.Select(i =>
//                {
//                    return new ResumeResponse.ExperienceResponse
//                    {
//                        Id = i.Id,
//                        CompanyName = i.CompanyName,
//                        JobTitle = i.JobTitle,
//                        StartDate = i.StartDate,
//                        EndDate = i.EndDate,
//                        ResumeId = i.ResumeId,
//                        ExperienceDescriptions = i.ExperienceDescriptions.Select(j =>
//                        {
//                            return new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
//                            {
//                                Id = j.Id,
//                                Description = j.Description,
//                                Order = j.Order,
//                                ExperienceId = j.ExperienceId
//                            };
//                        }).ToList()
//                    };
//                }).ToList(),
//                SkillGroups = body.SkillGroups.Select(i =>
//                {
//                    return new ResumeResponse.SkillGroupResponse
//                    {
//                        Id = i.Id,
//                        Name = i.Name,
//                        Order = i.Order,
//                        ResumeId = i.ResumeId,
//                        SkillElements = i.SkillElements.Select(j =>
//                        {
//                            return new ResumeResponse.SkillGroupResponse.SkillElementResponse
//                            {
//                                Id = j.Id,
//                                Name = j.Name,
//                                Order = j.Order,
//                                SkillGroupId = j.SkillGroupId
//                            };
//                        }).ToList()
//                    };
//                }).ToList(),
//                UserId = body.UserId
//            }
//        };
//    }

//    public ResponseCore<List<ResumeResponse>> ReadResumesByUserId(int userId)
//    {
//        var dto = resumeRepository.ReadAllByUserId(userId);
//        var body = dto.Body;
//        return new ResponseCore<List<ResumeResponse>>
//        {
//            Success = dto.Success,
//            Message = dto.Message,
//            Body = body == null ? [] : body
//                .Select(b => new ResumeResponse
//                {
//                    Id = b.Id,
//                    Name = b.Name,
//                    JobTitle = b.JobTitle,
//                    Description = b.Description,
//                    SocialMedias = b.SocialMedias.Select(i =>
//                    {
//                        return new ResumeResponse.SocialMediaResponse
//                        {
//                            Id = i.Id,
//                            Label = i.Label,
//                            Link = i.Link,
//                            Order = i.Order,
//                            ResumeId = i.ResumeId
//                        };
//                    }).ToList(),
//                    Educations = b.Educations.Select(i =>
//                    {
//                        return new ResumeResponse.EducationResponse
//                        {
//                            Id = i.Id,
//                            InstitutionName = i.InstitutionName,
//                            FieldOfStudy = i.FieldOfStudy,
//                            Degree = i.Degree,
//                            GraduationYear = i.GraduationYear,
//                            ResumeId = i.ResumeId
//                        };
//                    }).ToList(),
//                    Experiences = b.Experiences.Select(i =>
//                    {
//                        return new ResumeResponse.ExperienceResponse
//                        {
//                            Id = i.Id,
//                            CompanyName = i.CompanyName,
//                            JobTitle = i.JobTitle,
//                            StartDate = i.StartDate,
//                            EndDate = i.EndDate,
//                            ResumeId = i.ResumeId,
//                            ExperienceDescriptions = i.ExperienceDescriptions.Select(j =>
//                            {
//                                return new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
//                                {
//                                    Id = j.Id,
//                                    Description = j.Description,
//                                    Order = j.Order,
//                                    ExperienceId = j.ExperienceId
//                                };
//                            }).ToList()
//                        };
//                    }).ToList(),
//                    SkillGroups = b.SkillGroups.Select(i =>
//                    {
//                        return new ResumeResponse.SkillGroupResponse
//                        {
//                            Id = i.Id,
//                            Name = i.Name,
//                            Order = i.Order,
//                            ResumeId = i.ResumeId,
//                            SkillElements = i.SkillElements.Select(j =>
//                            {
//                                return new ResumeResponse.SkillGroupResponse.SkillElementResponse
//                                {
//                                    Id = j.Id,
//                                    Name = j.Name,
//                                    Order = j.Order,
//                                    SkillGroupId = j.SkillGroupId
//                                };
//                            }).ToList()
//                        };
//                    }).ToList(),
//                    UserId = b.UserId
//                })
//                .ToList()
//        };
//    }

//    public ResponseCore<ResumeResponse> UpdateResume(int id, ResumeRequest request)
//    {
//        // Resume
//        var resume = new Resume()
//        {
//            Id = id,
//            Name = request.Name,
//            JobTitle = request.JobTitle,
//            Description = request.Description,
//            UserId = request.UserId
//        };
//        var dto = resumeRepository.Update(id, resume);
//        var resumeBody = dto.Body;
//        // Social medias
//        var socialMedias = request.SocialMedias
//            .Select((s, index) =>
//            {
//                var socialMedia = new SocialMedia
//                {
//                    Id = s.Id,
//                    Label = s.Label,
//                    Link = s.Link,
//                    Order = s.Order,
//                    ResumeId = resume.Id
//                };
//                Console.WriteLine(socialMedia.Id);
//                Console.WriteLine(socialMedia.Label);
//                Console.WriteLine(socialMedia.Link);
//                Console.WriteLine(socialMedia.Order);
//                Console.WriteLine(socialMedia.ResumeId);
//                var response = socialMediaRepository.Update(s.Id, socialMedia);
//                if (response.Body != null)
//                {
//                    return new ResumeResponse.SocialMediaResponse
//                    {
//                        Id = response.Body.Id,
//                        Label = response.Body.Label,
//                        Link = response.Body.Link,
//                        Order = response.Body.Order,
//                        ResumeId = response.Body.ResumeId
//                    };
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();
//        /*
//        // Educations
//        var educations = request.Educations
//            .Select(s =>
//            {
//                var educcations = new Education
//                {
//                    InstitutionName = s.InstitutionName,
//                    FieldOfStudy = s.FieldOfStudy,
//                    Degree = s.Degree,
//                    GraduationYear = s.GraduationYear,
//                    ResumeId = resume.Id
//                };
//                var dto = educationRepository.Create(educcations);
//                if (dto.Body != null)
//                {
//                    return new ResumeResponse.EducationResponse
//                    {
//                        Id = dto.Body.Id,
//                        InstitutionName = dto.Body.InstitutionName,
//                        FieldOfStudy = dto.Body.FieldOfStudy,
//                        Degree = dto.Body.Degree,
//                        GraduationYear = dto.Body.GraduationYear,
//                        ResumeId = dto.Body.ResumeId
//                    };
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();
//        var experiences = request.Experiences
//            .Select(s =>
//            {
//                var experiences = new Experience
//                {
//                    CompanyName = s.CompanyName,
//                    JobTitle = s.JobTitle,
//                    StartDate = s.StartDate,
//                    EndDate = s.EndDate,
//                    ResumeId = resume.Id
//                };
//                var dto = experienceRepository.Create(experiences);
//                var experienceBody = dto.Body;
//                if (experienceBody != null)
//                {
//                    var experienceDescriptions = s.ExperienceDescriptions
//                        .Select(e =>
//                        {
//                            var experienceDescription = new ExperienceDescription
//                            {
//                                Description = e.Description,
//                                Order = e.Order,
//                                ExperienceId = experienceBody.Id
//                            };
//                            var dto2 = experienceDescriptionRepository.Create(experienceDescription);
//                            if (dto2.Body != null)
//                            {
//                                return new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
//                                {
//                                    Id = dto2.Body.Id,
//                                    Description = dto2.Body.Description,
//                                    Order = dto2.Body.Order,
//                                    ExperienceId = experienceBody.Id
//                                };
//                            }
//                            throw new Exception("Response can not be empty!");
//                        })
//                        .ToList();
//                    if (dto.Body != null)
//                    {
//                        return new ResumeResponse.ExperienceResponse
//                        {
//                            Id = dto.Body.Id,
//                            CompanyName = dto.Body.CompanyName,
//                            JobTitle = dto.Body.JobTitle,
//                            StartDate = dto.Body.StartDate,
//                            EndDate = dto.Body.EndDate,
//                            ResumeId = dto.Body.ResumeId,
//                            ExperienceDescriptions = experienceDescriptions,
//                        };
//                    }
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();

//        var skillGroups = request.SkillGroups
//            .Select(s =>
//            {
//                var skillGroup = new SkillGroup
//                {
//                    Name = s.Name,
//                    Order = s.Order,
//                    ResumeId = resume.Id,
//                };
//                var dto = skillGroupRepository.Create(skillGroup);
//                var skillGroupBody = dto.Body;
//                if (skillGroupBody != null)
//                {
//                    var skillElements = s.SkillElements
//                        .Select(e =>
//                        {
//                            var skillElement = new SkillElement
//                            {
//                                Name = e.Name,
//                                Order = e.Order,
//                                SkillGroupId = skillGroupBody.Id
//                            };
//                            var dto2 = skillElementRepository.Create(skillElement);
//                            if (dto2.Body != null)
//                            {
//                                return new ResumeResponse.SkillGroupResponse.SkillElementResponse
//                                {
//                                    Id = dto2.Body.Id,
//                                    Name = dto2.Body.Name,
//                                    Order = dto2.Body.Order,
//                                    SkillGroupId = skillGroupBody.Id
//                                };
//                            }
//                            throw new Exception("Response can not be empty!");
//                        })
//                        .ToList();
//                    if (dto.Body != null)
//                    {
//                        return new ResumeResponse.SkillGroupResponse
//                        {
//                            Id = dto.Body.Id,
//                            Name = dto.Body.Name,
//                            Order = dto.Body.Order,
//                            SkillElements = skillElements,
//                            ResumeId = dto.Body.ResumeId
//                        };
//                    }
//                }
//                throw new Exception("Response can not be empty!");
//            })
//            .ToList();
//        */
//        return new ResponseCore<ResumeResponse>
//        {
//            Success = dto.Success,
//            Message = dto.Message,
//            Body = resume == null ? null : new ResumeResponse
//            {
//                Id = resume.Id,
//                Name = resume.Name,
//                JobTitle = resume.JobTitle,
//                Description = resume.Description,
//                SocialMedias = socialMedias,
//                Educations = [],
//                Experiences = [],
//                SkillGroups = [],
//                UserId = resumeBody?.UserId ?? 0
//            }
//        };
//    }

//    public ResponseCore<ResumeResponse> DeleteResume(int id)
//    {
//        var dto = resumeRepository.Delete(id);
//        var body = dto.Body;
//        return new ResponseCore<ResumeResponse>
//        {
//            Success = dto.Success,
//            Message = dto.Message,
//            Body = body == null ? null : new ResumeResponse()
//            {
//                Id = body.Id,
//                Name = body.Name,
//                JobTitle = body.JobTitle,
//                Description = body.Description,
//                SocialMedias = body.SocialMedias.Select(i =>
//                {
//                    return new ResumeResponse.SocialMediaResponse
//                    {
//                        Id = i.Id,
//                        Label = i.Label,
//                        Link = i.Link,
//                        Order = i.Order,
//                        ResumeId = i.ResumeId
//                    };
//                }).ToList(),
//                Educations = body.Educations.Select(i =>
//                {
//                    return new ResumeResponse.EducationResponse
//                    {
//                        Id = i.Id,
//                        InstitutionName = i.InstitutionName,
//                        FieldOfStudy = i.FieldOfStudy,
//                        Degree = i.Degree,
//                        GraduationYear = i.GraduationYear,
//                        ResumeId = i.ResumeId
//                    };
//                }).ToList(),
//                Experiences = body.Experiences.Select(i =>
//                {
//                    return new ResumeResponse.ExperienceResponse
//                    {
//                        Id = i.Id,
//                        CompanyName = i.CompanyName,
//                        JobTitle = i.JobTitle,
//                        StartDate = i.StartDate,
//                        EndDate = i.EndDate,
//                        ResumeId = i.ResumeId,
//                        ExperienceDescriptions = i.ExperienceDescriptions.Select(j =>
//                        {
//                            return new ResumeResponse.ExperienceResponse.ExperienceDescriptionResponse
//                            {
//                                Id = j.Id,
//                                Description = j.Description,
//                                Order = j.Order,
//                                ExperienceId = j.ExperienceId
//                            };
//                        }).ToList()
//                    };
//                }).ToList(),
//                SkillGroups = body.SkillGroups.Select(i =>
//                {
//                    return new ResumeResponse.SkillGroupResponse
//                    {
//                        Id = i.Id,
//                        Name = i.Name,
//                        Order = i.Order,
//                        ResumeId = i.ResumeId,
//                        SkillElements = i.SkillElements.Select(j =>
//                        {
//                            return new ResumeResponse.SkillGroupResponse.SkillElementResponse
//                            {
//                                Id = j.Id,
//                                Name = j.Name,
//                                Order = j.Order,
//                                SkillGroupId = j.SkillGroupId
//                            };
//                        }).ToList()
//                    };
//                }).ToList(),
//                UserId = body?.UserId ?? 0
//            }
//        };
//    }
//}
