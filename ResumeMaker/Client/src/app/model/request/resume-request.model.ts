import { ResumeEntityModel } from "../entity/resume-entity.model";

export interface ResumeRequestModel extends Omit<ResumeEntityModel, 'id'> {
}
