export interface UpdateResumeSocialMediaRequestModel {
  label: string;
  link: string;
  order: number;
}

export interface UpdateResumeEducationRequestModel {
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  graduationYear: number;
}

export interface UpdateResumeExperienceDescriptionRequestModel {
  description: string;
  order: string;
}

export interface UpdateResumeExperienceRequestModel {
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date | null;
  experienceDescriptions: UpdateResumeExperienceDescriptionRequestModel[];
}

export interface UpdateResumeSkillElementRequestModel {
  name: string;
  order: number;
}

export interface UpdateResumeSkillGroupRequestModel {
  name: string;
  order: number;
  skillElements: UpdateResumeSkillElementRequestModel[];
}

export interface UpdateResumeRequestModel {
  name: string;
  jobTitle: string;
  description: string;
  userId: number;
  socialMedias: UpdateResumeSocialMediaRequestModel[];
  educations: UpdateResumeEducationRequestModel[];
  experiences: UpdateResumeExperienceRequestModel[];
  skillGroups: UpdateResumeSkillGroupRequestModel[];
}
