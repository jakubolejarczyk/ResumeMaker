import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";

import { CompanyDal } from "../dal/company.dal";

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private dal = inject(CompanyDal);
  private store = inject(Store);

  // getSelectedCompany$() {
  //   return this.store.select(CompanyState.getSelectedCompany);
  // }

  // getCompanies$() {
  //   return this.store.select(CompanyState.getCompanies);
  // }

  // getSelectedCompany() {
  //   return this.store.selectOnce(CompanyState.getSelectedCompany);
  // }

  // getCompanies() {
  //   return this.store.selectOnce(CompanyState.getCompanies);
  // }

  // select(company: CompanyEntityModel) {
  //   this.store.dispatch(new SelectCompany(company));
  // }

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
  //   return this.store.selectOnce(UserState.getSelectedUser).pipe(
  //     concatMap(selectedUser => {
  //       if (selectedUser) {
  //         return this.dal.readAllForUser(selectedUser.id);
  //       }
  //       throw new Error('User was not selected!');
  //     }),
  //     concatMap(response => {
  //       const { success, body } = response;
  //       const companies = success ? body : [];
  //       this.store.dispatch(new SetCompanies(companies));
  //       return this.getSelectedCompany$();
  //     }),
  //     concatMap(selectedCompany => {
  //       return forkJoin({ companies: this.getCompanies$() }).pipe(
  //         map(({ companies }) => ({ selectedCompany, companies }))
  //       )
  //     }),
  //     concatMap(({ selectedCompany, companies }) => {
  //       if (selectedCompany) {
  //         const currentSelectedCompany = companies.find(company => company.id === selectedCompany.id);
  //         if (currentSelectedCompany) {
  //           this.store.dispatch(new SelectCompany(currentSelectedCompany));
  //         } else {
  //           this.store.dispatch(new DeselectCompany());
  //         }
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
