import { ResumeEntityModel } from "../entity/resume-entity.model";

export interface UpdateResumeResponseModel {
  success: boolean;
  message: string;
  body: ResumeEntityModel;
}
