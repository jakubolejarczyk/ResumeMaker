import { ResumeEntityModel } from "../../model/entity/resume-entity.model";

export class SetResumes {
  static readonly type = '[Resume] Set Resumes';

  constructor(public resumes: ResumeEntityModel[]) { }
}

export class DeselectResume {
  static readonly type = '[Resume] Deselect';
}

export class SelectResume {
  static readonly type = '[Resume] Select';

  constructor(public resume: ResumeEntityModel) { }
}
