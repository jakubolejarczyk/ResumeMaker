import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { combineLatest, concatMap, map, of, take } from "rxjs";

import { CompanyDal } from "../dal/company.dal";
import { UserState } from "../store/state/user.state";
import { CompanyEntityModel } from "../model/entity/company-entity.model";
import { ResponseModel } from "../model/response/response.model";
import { DeselectCompany, SelectCompany, SetCompanies } from "../store/actions/company.actions";
import { CompanyRequestModel } from "../model/request/company-request.model";
import { CompanyState } from "../store/state/company.state";

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private dal = inject(CompanyDal);
  private store = inject(Store);

  //

  readAllForUser$() {
    return this.store.selectOnce(UserState.getSelectedUser).pipe(
      concatMap(selectedUser => {
        if (selectedUser) {
          return this.dal.readAllForUser$(selectedUser.id);
        }
        const response: ResponseModel<CompanyEntityModel[]> = {
          success: false,
          message: 'No companies found.',
          body: []
        };
        return of(response);
      }),
      concatMap(response => {
        const { success, body } = response;
        const companies = success ? body : [];
        this.store.dispatch(new SetCompanies(companies));
        return of(true);
      })
    );
  }

  getSelectedCompany$() {
    return this.store.select(CompanyState.getSelectedCompany);
  }

  getCompanies$() {
    return this.store.select(CompanyState.getCompanies);
  }

  select$(company: CompanyEntityModel) {
    return this.store.dispatch(new SelectCompany(company));
  }

  create$(request: CompanyRequestModel) {
    return this.dal.create$(request).pipe(
      concatMap(response => {
        return this.readAllForUser$().pipe(
          map(() => response)
        );
      })
    );
  }

  update$(id: number, request: CompanyRequestModel) {
    return this.dal.update$(id, request).pipe(
      concatMap(response => {
        return this.readAllForUser$().pipe(
          map(() => response)
        );
      }),
      concatMap(response => {
        return this.refreshSelectedCompany$().pipe(
          map(() => response)
        );
      })
    );
  }

  delete$(id: number) {
    return this.dal.delete$(id).pipe(
      concatMap(() => this.readAllForUser$()),
      concatMap(() => this.refreshSelectedCompany$())
    );
  }

  refreshSelectedCompany$() {
    return combineLatest({
      selectedCompany: this.getSelectedCompany$(),
      companies: this.getCompanies$()
    }).pipe(
      take(1),
      concatMap(({ selectedCompany, companies }) => {
        if (selectedCompany) {
          const currentSelectedCompany = companies.find(company => company.id === selectedCompany.id);
          if (currentSelectedCompany) {
            return this.select$(currentSelectedCompany);
          } else {
            this.store.dispatch(new DeselectCompany());
          }
        }
        return of(void 0);
      })
    );
  }

  deselect$() {
    return this.store.dispatch(new DeselectCompany());
  }
}
