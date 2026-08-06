import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { concatMap, filter, of, take, tap } from "rxjs";

import { ResumeDal } from "../dal/resume.dal";
import { ResumeRequestModel } from "../model/request/resume-request.model";
import { UserState } from "../store/state/user.state";
import { ResponseModel } from "../model/response/response.model";
import { ResumeEntityModel } from "../model/entity/resume-entity.model";
import { SetResumes } from "../store/actions/resume.actions";
import { ResumeState } from "../store/state/resume.state";

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private dal = inject(ResumeDal);
  private store = inject(Store);

  // getSelectedCompany$() {
  //   return this.store.select(CompanyState.getSelectedCompany);
  // }

  getResumes$() {
    return this.store.select(ResumeState.getResumes);
  }

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
      concatMap(() => this.readAllForUser$())
    );
  }

  readAllForUser$() {
    return this.store.select(UserState.getSelectedUser).pipe(
      take(1),
      concatMap(selectedUser => {
        if (selectedUser) {
          return this.dal.readAllForUser$(selectedUser.id);
        }
        const response: ResponseModel<ResumeEntityModel[]> = {
          success: false,
          message: 'No resumes found.',
          body: []
        };
        return of(response);
      }),
      concatMap(response => {
        const { success, body } = response;
        const companies = success ? body : [];
        return this.store.dispatch(new SetResumes(companies));
      })
    );
  }

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
