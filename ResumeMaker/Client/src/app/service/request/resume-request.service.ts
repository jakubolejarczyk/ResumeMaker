import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs";

import { AppStore } from "../../store/app-store";
import { CreateResumeRequestModel } from "../../model/request/create-resume-request.model";
import { CreateResumeResponseModel } from "../../model/response/create-resume-response.model";
import { ReadResumesResponseModel } from "../../model/response/read-resumes-response.model";
import { DeleteResumeResponseModel } from "../../model/response/delete-resume-response.model";

@Injectable({ providedIn: 'root' })
export class ResumeRequestService {
  readonly API_ENDPOINT = 'http://localhost:5038/api/resume/';

  httpClient = inject(HttpClient);
  appStore = inject(AppStore);

  createResume(request: CreateResumeRequestModel) {
    this.httpClient.post<CreateResumeResponseModel>(this.API_ENDPOINT, request)
      .pipe(
        switchMap(response => {
          alert(response.message);
          const userId = this.appStore.user.value?.id ?? -1;
          return this.httpClient.get<ReadResumesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
        })
    )
      .subscribe(response => this.appStore.resumes.next(response.body));
  }

  // readCompany(id: string, updateCompanyForm: FormGroup<{
  //   companyName: FormControl,
  //   city: FormControl,
  //   country: FormControl,
  //   includeConsentClause: FormControl,
  //   customConsentClause: FormControl,
  //   recruitmentStatus: FormControl
  // }>) {
  //   this.httpClient.get<ReadCompanyResponseModel>(this.API_ENDPOINT + id).subscribe(response => {
  //     if (response.success) {
  //       updateCompanyForm.controls.companyName.setValue(response.body.companyName);
  //       updateCompanyForm.controls.city.setValue(response.body.city);
  //       updateCompanyForm.controls.country.setValue(response.body.country);
  //       updateCompanyForm.controls.includeConsentClause.setValue(response.body.includeConsentClause);
  //       updateCompanyForm.controls.customConsentClause.setValue(response.body.customConsentClause);
  //       updateCompanyForm.controls.recruitmentStatus.setValue(response.body.recruitmentStatus);
  //     }
  //   });
  // }

  readResumes() {
    const userId = this.appStore.user.value?.id ?? -1;
    this.httpClient.get<ReadResumesResponseModel>(this.API_ENDPOINT + `user/${userId}`).subscribe(response => {
      if (!response.success) {
        alert(response.message);
      }
      this.appStore.resumes.next(response.body);
    });
  }

  // updateCompany(id: string, request: UpdateCompanyRequestModel) {
  //   this.httpClient.patch<UpdateCompanyResponseModel>(this.API_ENDPOINT + id, request)
  //     .pipe(
  //       switchMap(response => {
  //         alert(response.message);
  //         const { value } = this.appStore.company;
  //         if (value?.id === response.body.id) {
  //           this.appStore.company.next(response.body);
  //         }
  //         const userId = this.appStore.user.value?.id ?? -1;
  //         return this.httpClient.get<ReadCompaniesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
  //       })
  //   )
  //     .subscribe(response => this.appStore.companies.next(response.body));
  // }

  deleteResume(resumeId: number) {
    this.httpClient.delete<DeleteResumeResponseModel>(this.API_ENDPOINT + resumeId)
      .pipe(
        switchMap(response => {
          alert(response.message);
          const { value } = this.appStore.resume;
          if (value?.id === response.body.id) {
            this.appStore.resume.next(undefined);
          }
          const userId = this.appStore.user.value?.id ?? -1;
          return this.httpClient.get<ReadResumesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
        })
      )
      .subscribe(response => {
        this.appStore.resumes.next(response.body);
      });
  }
}
