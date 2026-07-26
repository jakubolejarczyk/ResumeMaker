import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

import { UserEntityModel } from "../model/entity/user-entity.model";
import { CompanyEntityModel } from "../model/entity/company-entity.model";
import { ResumeEntityModel } from "../model/entity/resume-entity.model";

@Injectable({ providedIn: 'root' })
export class AppStore {
  user = new BehaviorSubject<UserEntityModel | undefined>(undefined);

  company = new BehaviorSubject<CompanyEntityModel | undefined>(undefined);

  users = new BehaviorSubject<UserEntityModel[]>([]);

  companies = new BehaviorSubject<CompanyEntityModel[]>([]);

  resumes = new BehaviorSubject<ResumeEntityModel[]>([]);
}
