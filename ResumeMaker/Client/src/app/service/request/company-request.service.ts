import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs";

import { AppStore } from "../../store/app-store";
import { CreateCompanyRequestModel } from "../../model/request/create-company-request.model";
import { CreateCompanyResponseModel } from "../../model/response/create-company-response.model";
import { ReadCompaniesResponseModel } from "../../model/response/read-companies-response.model";
import { DeleteCompanyResponseModel } from "../../model/response/delete-company-response.model";

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

  // readUser(id: string, updateUserForm: FormGroup<{
  //   email: FormControl,
  //   firstName: FormControl,
  //   lastName: FormControl,
  //   city: FormControl,
  //   country: FormControl,
  //   phoneNumber: FormControl
  // }>) {
  //   this.httpClient.get<ReadUserResponseModel>(this.API_ENDPOINT + id).subscribe(response => {
  //     if (response.success) {
  //       updateUserForm.controls.email.setValue(response.body.email);
  //       updateUserForm.controls.firstName.setValue(response.body.firstName);
  //       updateUserForm.controls.lastName.setValue(response.body.lastName);
  //       updateUserForm.controls.city.setValue(response.body.city);
  //       updateUserForm.controls.country.setValue(response.body.country);
  //       updateUserForm.controls.phoneNumber.setValue(response.body.phoneNumber);
  //     }
  //   });
  // }

  readCompanies() {
    const userId = this.appStore.user.value?.id ?? -1;
    this.httpClient.get<ReadCompaniesResponseModel>(this.API_ENDPOINT + `user/${userId}`).subscribe(response => {
      if (!response.success) {
        alert(response.message);
      }
      this.appStore.companies.next(response.body);
    });
  }

  // updateUser(id: string, request: UpdateUserRequestModel) {
  //   this.httpClient.patch<UpdateUserResponseModel>(this.API_ENDPOINT + id, request)
  //     .pipe(
  //       switchMap(response => {
  //         alert(response.message);
  //         const { value } = this.appStore.user;
  //         if (value?.id === response.body.id) {
  //           this.appStore.user.next(response.body);
  //         }
  //         return this.httpClient.get<ReadUsersResponseModel>(this.API_ENDPOINT);
  //       })
  //   )
  //     .subscribe(response => this.appStore.users.next(response.body));
  // }

  deleteCompany(companyId: number) {
    this.httpClient.delete<DeleteCompanyResponseModel>(this.API_ENDPOINT + companyId)
      .pipe(
        switchMap(response => {
          alert(response.message);
          const { value } = this.appStore.company;
          if (value?.id === response.body.id) {
            this.appStore.company.next(undefined);
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
