import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Store } from "@ngxs/store";

import { FetchAllUsersAction } from "../store/action/users/fetch-all-users.action";

export const initGuard: CanActivateFn = () => {
  const store = inject(Store);
  store.dispatch(new FetchAllUsersAction());
  return true;
};
