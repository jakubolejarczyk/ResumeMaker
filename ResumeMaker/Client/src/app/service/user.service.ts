import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";

import { UserState } from "../store/state/user.state";
import { SelectUserAction } from "../store/action/user/select-user.action";

@Injectable({ providedIn: 'root' })
export class UserService {
  store = inject(Store);

  getSelectedUserId() {
    return this.store.select(UserState.getSelectedUserId);
  }

  select(userId: number) {
    this.store.dispatch(new SelectUserAction(userId));
  }
}
