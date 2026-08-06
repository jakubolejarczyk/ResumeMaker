export interface ResumeSocialMediaEntityModel {
  id?: number;
  label: string;
  link: string;
  order: number;
  resumeId?: number;
}

export interface ResumeEducationEntityModel {
  id?: number;
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  graduationYear: number;
  order: number;
  resumeId?: number;
}

export interface ResumeExperienceDescriptionEntityModel {
  id?: number;
  description: string;
  order: number;
  experienceId?: number;
}

export interface ResumeExperienceEntityModel {
  id?: number;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate?: Date;
  order: number;
  resumeId?: number;
  experienceDescriptions: ResumeExperienceDescriptionEntityModel[];
}

export interface ResumeSkillElementEntityModel {
  id?: number;
  name: string;
  order: number;
  skillGroupId?: number;
}

export interface ResumeSkillGroupEntityModel {
  id?: number;
  name: string;
  order: number;
  resumeId?: number;
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
