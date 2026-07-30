import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";

import { CompanyDal } from "../dal/company.dal";
import { CompanyState } from "../store/state/company.state";
import { CompanyEntityModel } from "../model/entity/company-entity.model";
import { SelectCompany } from "../store/actions/company.actions";

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private dal = inject(CompanyDal);
  private store = inject(Store);

  getSelectedCompany$() {
    return this.store.select(CompanyState.getSelectedCompany);
  }

  getCompanies$() {
    return this.store.select(CompanyState.getCompanies);
  }

  getSelectedCompany() {
    return this.store.selectOnce(CompanyState.getSelectedCompany);
  }

  getCompanies() {
    return this.store.selectOnce(CompanyState.getCompanies);
  }

  select(company: CompanyEntityModel) {
    this.store.dispatch(new SelectCompany(company));
  }

  // create(request: CompanyRequestModel) {
  //   return this.dal.create(request).pipe(
  //     concatMap(response => {
  //       const { success, message } = response;
  //       if (success) {
  //         return of(response);
  //       }
  //       throw new Error(message);
  //     }),
  //     concatMap(response => {
  //       return this.readAllForUser().pipe(
  //         map(() => response)
  //       );
  //     })
  //   );
  // }

  // readAllForUser() {
  //   const selectedUser = this.store.selectSnapshot(UserState.getSelectedUser);
  //   if (!selectedUser) {
  //     throw new Error('User was not selected!');
  //   }
  //   return this.dal.readAllForUser(selectedUser.id).pipe(
  //     concatMap(response => {
  //       const { success, body } = response;
  //       const companies = success ? body : [];
  //       this.store.dispatch(new SetCompanies(companies));
  //       return of(void 0);
  //     }),
  //     concatMap(() => {
  //       const selectedCompany = this.store.selectSnapshot(CompanyState.getSelectedCompany);
  //       if (selectedCompany === undefined) return of(void 0);
  //       const companies = this.store.selectSnapshot(CompanyState.getCompanies);
  //       const selectedCompanyCopy = companies.find(company => company.id === selectedCompany.id);
  //       if (selectedCompanyCopy) {
  //         this.store.dispatch(new SelectCompany(selectedCompanyCopy));
  //       } else {
  //         this.store.dispatch(new DeselectCompany());
  //       }
  //       return of(void 0);
  //     })
  //   );
  // }

  // delete(id: number) {
  //   return this.dal.delete(id).pipe(
  //     concatMap(response => {
  //       const { success, message } = response;
  //       if (success) {
  //         return of(response);
  //       }
  //       throw new Error(message);
  //     }),
  //     concatMap(response => {
  //       return this.readAll().pipe(
  //         map(() => response)
  //       );
  //     })
  //   );
  // }

  // update(id: number, request: UserRequestModel) {
  //   return this.dal.update(id, request).pipe(
  //     concatMap(response => {
  //       const { success, message } = response;
  //       if (success) {
  //         return of(response);
  //       }
  //       throw new Error(message);
  //     }),
  //     concatMap(response => {
  //       return this.readAll().pipe(
  //         map(() => response)
  //       );
  //     })
  //   );
  // }
}
