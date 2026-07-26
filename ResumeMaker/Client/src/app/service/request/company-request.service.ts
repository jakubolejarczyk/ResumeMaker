import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs";

import { AppStore } from "../../store/app-store";
import { CreateCompanyRequestModel } from "../../model/request/create-company-request.model";
import { CreateCompanyResponseModel } from "../../model/response/create-company-response.model";
import { ReadCompaniesResponseModel } from "../../model/response/read-companies-response.model";
import { DeleteCompanyResponseModel } from "../../model/response/delete-company-response.model";
import { FormControl, FormGroup } from "@angular/forms";
import { ReadCompanyResponseModel } from "../../model/response/read-company-response.model";
import { UpdateCompanyRequestModel } from "../../model/request/update-company-request.model";
import { UpdateCompanyResponseModel } from "../../model/response/update-company-response.model";

@Injectable({ providedIn: 'root' })
export class CompanyRequestService {
  readonly API_ENDPOINT = 'http://localhost:5038/api/company/';

  httpClient = inject(HttpClient);
  appStore = inject(AppStore);

  createCompany(request: CreateCompanyRequestModel) {
    this.httpClient.post<CreateCompanyResponseModel>(this.API_ENDPOINT, request)
      .pipe(
        switchMap(response => {
          alert(response.message);
          const userId = this.appStore.user.value?.id ?? -1;
          return this.httpClient.get<ReadCompaniesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
        })
      )
      .subscribe(response => this.appStore.companies.next(response.body));
  }

  readCompany(id: string, updateCompanyForm: FormGroup<{
    companyName: FormControl,
    city: FormControl,
    country: FormControl,
    includeConsentClause: FormControl,
    customConsentClause: FormControl,
    recruitmentStatus: FormControl
  }>) {
    this.httpClient.get<ReadCompanyResponseModel>(this.API_ENDPOINT + id).subscribe(response => {
      if (response.success) {
        updateCompanyForm.controls.companyName.setValue(response.body.companyName);
        updateCompanyForm.controls.city.setValue(response.body.city);
        updateCompanyForm.controls.country.setValue(response.body.country);
        updateCompanyForm.controls.includeConsentClause.setValue(response.body.includeConsentClause);
        updateCompanyForm.controls.customConsentClause.setValue(response.body.customConsentClause);
        updateCompanyForm.controls.recruitmentStatus.setValue(response.body.recruitmentStatus);
      }
    });
  }

  readCompanies() {
    const userId = this.appStore.user.value?.id ?? -1;
    this.httpClient.get<ReadCompaniesResponseModel>(this.API_ENDPOINT + `user/${userId}`).subscribe(response => {
      if (!response.success) {
        alert(response.message);
      }
      this.appStore.companies.next(response.body);
    });
  }

  updateCompany(id: string, request: UpdateCompanyRequestModel) {
    this.httpClient.patch<UpdateCompanyResponseModel>(this.API_ENDPOINT + id, request)
      .pipe(
        switchMap(response => {
          alert(response.message);
          const { value } = this.appStore.company;
          if (value?.id === response.body.id) {
            this.appStore.company.next(response.body);
          }
          const userId = this.appStore.user.value?.id ?? -1;
          return this.httpClient.get<ReadCompaniesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
        })
    )
      .subscribe(response => this.appStore.companies.next(response.body));
  }

  deleteCompany(companyId: number) {
    this.httpClient.delete<DeleteCompanyResponseModel>(this.API_ENDPOINT + companyId)
      .pipe(
        switchMap(response => {
          alert(response.message);
          const { value } = this.appStore.company;
          if (value?.id === response.body.id) {
            this.appStore.company.next(undefined);
          }
          const resumeValue = this.appStore.resume.value;
          if (resumeValue?.userId === response.body.id) {
            this.appStore.resume.next(undefined);
          }
          const userId = this.appStore.user.value?.id ?? -1;
          return this.httpClient.get<ReadCompaniesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
        })
      )
      .subscribe(response => {
        this.appStore.companies.next(response.body);
      });
  }
}
