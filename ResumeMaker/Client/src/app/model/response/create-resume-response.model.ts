interface CreateResumeSocialMediaResponseModel {
  id: number;
  label: string;
  link: string;
  order: number;
  resumeId: number;
}

interface CreateResumeEducationResponseModel {
  id: number;
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  graduationYear: number;
  resumeId: number;
}

interface CreateResumeExperienceDescriptionResponseModel {
  id: number;
  description: string;
  order: string;
  experienceId: number;
}

interface CreateResumeExperienceResponseModel {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate?: Date;
  experienceDescriptions: CreateResumeExperienceDescriptionResponseModel[];
  resumeId: number;
}

interface CreateResumeSkillElementResponseModel {
  id: number;
  name: string;
  order: string;
  skillGroupId: number;
}

interface CreateResumeSkillGroupResponseModel {
  id: number;
  name: string;
  order: string;
  skillElements: CreateResumeSkillElementResponseModel[];
  resumeId: number;
}

export interface CreateResumeResponseModel {
  id: number;
  name: string;
  jobTitle: string;
  description: string;
  userId: string;
  socialMedias: CreateResumeSocialMediaResponseModel[];
  educations: CreateResumeEducationResponseModel[];
  experiences: CreateResumeExperienceResponseModel[];
  skillGroups: CreateResumeSkillGroupResponseModel[];
}
