export interface UpdateResumeSocialMediaRequestModel {
  id: number;
  label: string;
  link: string;
  order: number;
}

export interface UpdateResumeEducationRequestModel {
  id: number;
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  graduationYear: number;
}

export interface UpdateResumeExperienceDescriptionRequestModel {
  id: number;
  description: string;
  order: string;
}

export interface UpdateResumeExperienceRequestModel {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date | null;
  experienceDescriptions: UpdateResumeExperienceDescriptionRequestModel[];
}

export interface UpdateResumeSkillElementRequestModel {
  id: number;
  name: string;
  order: number;
}

export interface UpdateResumeSkillGroupRequestModel {
  id: number;
  name: string;
  order: number;
  skillElements: UpdateResumeSkillElementRequestModel[];
}

export interface UpdateResumeRequestModel {
  id: number;
  name: string;
  jobTitle: string;
  description: string;
  userId: number;
  socialMedias: UpdateResumeSocialMediaRequestModel[];
  educations: UpdateResumeEducationRequestModel[];
  experiences: UpdateResumeExperienceRequestModel[];
  skillGroups: UpdateResumeSkillGroupRequestModel[];
}
