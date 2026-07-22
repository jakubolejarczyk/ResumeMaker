import { Injectable } from "@angular/core";

import { StoreBase } from "../base/store.base";

@Injectable({ providedIn: 'root' })
export class UserStore extends StoreBase<number> {
  constructor() {
    super(-1);
  }
}
