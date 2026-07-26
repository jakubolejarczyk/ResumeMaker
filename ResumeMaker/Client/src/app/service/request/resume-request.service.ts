import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs";

import { AppStore } from "../../store/app-store";
import { CreateResumeRequestModel } from "../../model/request/create-resume-request.model";
import { CreateResumeResponseModel } from "../../model/response/create-resume-response.model";
import { ReadResumesResponseModel } from "../../model/response/read-resumes-response.model";
import { DeleteResumeResponseModel } from "../../model/response/delete-resume-response.model";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ReadResumeResponseModel } from "../../model/response/read-resume-response.model";

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

  readResume(id: string, updateResumeForm: FormGroup<{
    name: FormControl,
    jobTitle: FormControl,
    description: FormControl,
    socialMedias: FormArray,
    educations: FormArray,
    experiences: FormArray,
    skillGroups: FormArray
  }>) {
    this.httpClient.get<ReadResumeResponseModel>(this.API_ENDPOINT + id).subscribe(response => {
      console.log(response);
      if (response.success) {
        updateResumeForm.controls.name.setValue(response.body.name);
        updateResumeForm.controls.jobTitle.setValue(response.body.jobTitle);
        updateResumeForm.controls.description.setValue(response.body.description);
        updateResumeForm.controls.socialMedias.setValue(response.body.socialMedias);
        updateResumeForm.controls.educations.setValue(response.body.educations);
        updateResumeForm.controls.experiences.setValue(response.body.experiences);
        updateResumeForm.controls.skillGroups.setValue(response.body.skillGroups);
      }
    });
  }

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
