import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { filter, tap } from "rxjs";

import { ResumeDal } from "../dal/resume.dal";
import { ResumeRequestModel } from "../model/request/resume-request.model";

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private dal = inject(ResumeDal);
  private store = inject(Store);

  // getSelectedCompany$() {
  //   return this.store.select(CompanyState.getSelectedCompany);
  // }

  // getCompanies$() {
  //   return this.store.select(CompanyState.getCompanies);
  // }

  // select(company: CompanyEntityModel) {
  //   this.store.dispatch(new SelectCompany(company));
  // }

  // deselect$() {
  //   return combineLatest({
  //     selectedCompany: this.getSelectedCompany$(),
  //     companies: this.getCompanies$()
  //   }).pipe(
  //     take(1),
  //     map(({ selectedCompany, companies }) => {
  //       if (!selectedCompany) return;
  //       const selectedCompanyExists = companies.some(company => company.id === selectedCompany.id);
  //       if (selectedCompanyExists) return;
  //       this.store.dispatch(new DeselectCompany());
  //     })
  //   );
  // }

  // updateSelection$() {
  //   return combineLatest({
  //     selectedCompany: this.getSelectedCompany$(),
  //     companies: this.getCompanies$()
  //   }).pipe(
  //     take(1),
  //     map(({ selectedCompany, companies }) => {
  //       if (!selectedCompany) return;
  //       const newSelectedCompany = companies.find(company => company.id === selectedCompany.id);
  //       if (newSelectedCompany) this.store.dispatch(new SelectCompany(newSelectedCompany));
  //     })
  //   );
  // }

  create$(request: ResumeRequestModel) {
    return this.dal.create$(request).pipe(
      tap(response => alert(response.message)),
      filter(response => response.success),
      // concatMap(() => this.readAllForUser$())
    );
  }

  // readAllForUser$() {
  //   return this.store.select(UserState.getSelectedUser).pipe(
  //     take(1),
  //     concatMap(selectedUser => {
  //       if (selectedUser) {
  //         return this.dal.readAllForUser$(selectedUser.id);
  //       }
  //       const response: ResponseModel<CompanyEntityModel[]> = {
  //         success: false,
  //         message: 'No companies found.',
  //         body: []
  //       };
  //       return of(response);
  //     }),
  //     concatMap(response => {
  //       const { success, body } = response;
  //       const companies = success ? body : [];
  //       return this.store.dispatch(new SetCompanies(companies));
  //     })
  //   );
  // }

  // update$(id: number, request: CompanyRequestModel) {
  //   return this.dal.update$(id, request).pipe(
  //     tap(response => alert(response.message)),
  //     filter(response => response.success),
  //     concatMap(() => this.readAllForUser$()),
  //     concatMap(() => this.updateSelection$())
  //   );
  // }

  // delete$(id: number) {
  //   return this.dal.delete$(id).pipe(
  //     tap(response => alert(response.message)),
  //     filter(response => response.success),
  //     concatMap(() => this.readAllForUser$()),
  //     concatMap(() => this.deselect$())
  //   );
  // }
}
