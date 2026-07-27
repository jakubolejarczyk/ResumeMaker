export interface CreateResumeSocialMediaRequestModel {
  id?: number;
  label: string;
  link: string;
  order: number;
}

export interface CreateResumeEducationRequestModel {
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  graduationYear: number;
}

export interface CreateResumeExperienceDescriptionRequestModel {
  description: string;
  order: string;
}

export interface CreateResumeExperienceRequestModel {
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date | null;
  experienceDescriptions: CreateResumeExperienceDescriptionRequestModel[];
}

export interface CreateResumeSkillElementRequestModel {
  name: string;
  order: number;
}

export interface CreateResumeSkillGroupRequestModel {
  name: string;
  order: number;
  skillElements: CreateResumeSkillElementRequestModel[];
}

export interface CreateResumeRequestModel {
  name: string;
  jobTitle: string;
  description: string;
  userId: number;
  socialMedias: CreateResumeSocialMediaRequestModel[];
  educations: CreateResumeEducationRequestModel[];
  experiences: CreateResumeExperienceRequestModel[];
  skillGroups: CreateResumeSkillGroupRequestModel[];
}
