export interface ResumeSocialMediaEntityModel {
  id: number;
  label: string;
  link: string;
  order: number;
  resumeId: number;
  operation: string;
}

export interface ResumeEducationEntityModel {
  id: number;
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  graduationYear: number;
  resumeId: number;
  operation: string;
}

export interface ResumeExperienceDescriptionEntityModel {
  id: number;
  description: string;
  order: string;
  experienceId: number;
  operation: string;
}

export interface ResumeExperienceEntityModel {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate?: Date;
  resumeId: number;
  operation: string;
  experienceDescriptions: ResumeExperienceDescriptionEntityModel[];
}

export interface ResumeSkillElementEntityModel {
  id: number;
  name: string;
  order: string;
  skillGroupId: number;
  operation: string;
}

export interface ResumeSkillGroupEntityModel {
  id: number;
  name: string;
  order: string;
  resumeId: number;
  operation: string;
  skillElements: ResumeSkillElementEntityModel[];
}

export interface ResumeEntityModel {
  id: number;
  name: string;
  jobTitle: string;
  description: string;
  userId: number;
  socialMedias: ResumeSocialMediaEntityModel[];
  educations: ResumeEducationEntityModel[];
  experiences: ResumeExperienceEntityModel[];
  skillGroups: ResumeSkillGroupEntityModel[];
}
