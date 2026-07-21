import { Injectable } from "@angular/core";

import { StoreBase } from "../base/store.base";
import { UserEntityModel } from "../model/entity/user-entity.model";

@Injectable({ providedIn: 'root' })
export class UsersStore extends StoreBase<UserEntityModel[]> {
  constructor() {
    super([]);
  }
}
