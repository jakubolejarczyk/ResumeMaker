import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

import { UserEntityModel } from "../model/entity/user-entity.model";

@Injectable({ providedIn: 'root' })
export class AppStore {
  user = new BehaviorSubject<UserEntityModel | undefined>(undefined);

  users = new BehaviorSubject<UserEntityModel[]>([]);
}
