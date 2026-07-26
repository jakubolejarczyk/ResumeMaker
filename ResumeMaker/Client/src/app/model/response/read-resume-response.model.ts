import { ResumeEntityModel } from "../entity/resume-entity.model";

export interface ReadResumeResponseModel {
  success: boolean;
  message: string;
  body: ResumeEntityModel;
}
