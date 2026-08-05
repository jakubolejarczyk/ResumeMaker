import { ResumeEntityModel } from "../entity/resume-entity.model";

export interface ResumeStateModel {
  selectedResume?: ResumeEntityModel;
  resumes: ResumeEntityModel[];
}
