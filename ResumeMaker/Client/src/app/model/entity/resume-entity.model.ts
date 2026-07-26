interface ResumeSocialMediaEntityModel {
  id: number;
  label: string;
  link: string;
  order: number;
  resumeId: number;
}

interface ResumeEducationEntityModel {
  id: number;
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  graduationYear: number;
  resumeId: number;
}

interface ResumeExperienceDescriptionEntityModel {
  id: number;
  description: string;
  order: string;
  experienceId: number;
}

interface ResumeExperienceEntityModel {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate?: Date;
  experienceDescriptions: ResumeExperienceDescriptionEntityModel[];
  resumeId: number;
}

interface ResumeSkillElementEntityModel {
  id: number;
  name: string;
  order: string;
  skillGroupId: number;
}

interface ResumeSkillGroupEntityModel {
  id: number;
  name: string;
  order: string;
  skillElements: ResumeSkillElementEntityModel[];
  resumeId: number;
}

export interface ResumeEntityModel {
  id: number;
  name: string;
  jobTitle: string;
  description: string;
  userId: string;
  socialMedias: ResumeSocialMediaEntityModel[];
  educations: ResumeEducationEntityModel[];
  experiences: ResumeExperienceEntityModel[];
  skillGroups: ResumeSkillGroupEntityModel[];
}
