import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Store } from "@ngxs/store";

import { FetchAllUserAction } from "../store/action/user/fetch-all-user.action";

export const initGuard: CanActivateFn = () => {
  const store = inject(Store);
  store.dispatch(new FetchAllUserAction());
  return true;
};
