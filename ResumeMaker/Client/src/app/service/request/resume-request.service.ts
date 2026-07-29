// import { inject, Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { switchMap } from "rxjs";

// import { AppStore } from "../../old/app-store";
// import { CreateResumeRequestModel } from "../../model/request/create-resume-request.model";
// import { CreateResumeResponseModel } from "../../model/response/create-resume-response.model";
// import { ReadResumesResponseModel } from "../../model/response/read-resumes-response.model";
// import { DeleteResumeResponseModel } from "../../model/response/delete-resume-response.model";
// import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
// import { ReadResumeResponseModel } from "../../model/response/read-resume-response.model";
// import { ResumeEducationEntityModel, ResumeExperienceDescriptionEntityModel, ResumeExperienceEntityModel, ResumeSkillElementEntityModel, ResumeSkillGroupEntityModel, ResumeSocialMediaEntityModel } from "../../model/entity/resume-entity.model";
// import { UpdateResumeResponseModel } from "../../model/response/update-resume-response.model";
// import { UpdateCompanyRequestModel } from "../../model/request/update-company-request.model";
// import { UpdateResumeRequestModel } from "../../model/request/update-resume-request.model";

// @Injectable({ providedIn: 'root' })
// export class ResumeRequestService {
//   readonly API_ENDPOINT = 'http:localhost:5038/api/resume/';

//   httpClient = inject(HttpClient);
//   appStore = inject(AppStore);
//   formBuilder = inject(FormBuilder);

//   createResume(request: CreateResumeRequestModel) {
//     this.httpClient.post<CreateResumeResponseModel>(this.API_ENDPOINT, request)
//       .pipe(
//         switchMap(response => {
//           alert(response.message);
//           const userId = this.appStore.user.value?.id ?? -1;
//           return this.httpClient.get<ReadResumesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
//         })
//     )
//       .subscribe(response => this.appStore.resumes.next(response.body));
//   }

//   readResume(id: string, updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>) {
//     this.httpClient.get<ReadResumeResponseModel>(this.API_ENDPOINT + id).subscribe(response => {
//       if (response.success) {
//         updateResumeForm.controls.name.setValue(response.body.name);
//         updateResumeForm.controls.jobTitle.setValue(response.body.jobTitle);
//         updateResumeForm.controls.description.setValue(response.body.description);
//         response.body.socialMedias.forEach(socialMedia => {
//           this.addSocialMedia(updateResumeForm, socialMedia);
//         });
//         response.body.educations.forEach(education => {
//           this.addEducation(updateResumeForm, education);
//         });
//         response.body.experiences.forEach((experience, experienceIndex) => {
//           this.addExperience(updateResumeForm, experience);
//           experience.experienceDescriptions.forEach(experienceDescription => {
//             this.addExperienceDescription(updateResumeForm, experienceDescription, experienceIndex);
//           });
//         });
//         response.body.skillGroups.forEach((skillGroup, skillGroupIndex) => {
//           this.addSkillGroup(updateResumeForm, skillGroup);
//           skillGroup.skillElements.forEach(skillElement => {
//             this.addSkillElement(updateResumeForm, skillElement, skillGroupIndex);
//           });
//         });
//       }
//     });
//   }

//   readResumes() {
//     const userId = this.appStore.user.value?.id ?? -1;
//     this.httpClient.get<ReadResumesResponseModel>(this.API_ENDPOINT + `user/${userId}`).subscribe(response => {
//       if (!response.success) {
//         alert(response.message);
//       }
//       this.appStore.resumes.next(response.body);
//     });
//   }

//   updateResume(id: string, request: UpdateResumeRequestModel) {
//     console.log(request);
//     this.httpClient.patch<UpdateResumeResponseModel>(this.API_ENDPOINT + id, request)
//         .pipe(
//           switchMap(response => {
//             console.log("update", response);
//             alert(response.message);
//             const userId = this.appStore.user.value?.id ?? -1;
//             return this.httpClient.get<ReadResumesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
//           })
//       )
//         .subscribe(response => this.appStore.resumes.next(response.body));
//   }

//   deleteResume(resumeId: number) {
//     this.httpClient.delete<DeleteResumeResponseModel>(this.API_ENDPOINT + resumeId)
//       .pipe(
//         switchMap(response => {
//           alert(response.message);
//           const { value } = this.appStore.resume;
//           if (value?.id === response.body.id) {
//             this.appStore.resume.next(undefined);
//           }
//           const userId = this.appStore.user.value?.id ?? -1;
//           return this.httpClient.get<ReadResumesResponseModel>(this.API_ENDPOINT + `user/${userId}`);
//         })
//       )
//       .subscribe(response => {
//         this.appStore.resumes.next(response.body);
//       });
//   }

//   private getSocialMedias(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>) {
//     return <FormArray>updateResumeForm.get('socialMedias');
//   }

//   private addSocialMedia(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, socialMedia: ResumeSocialMediaEntityModel) {
//     const control = this.formBuilder.group({
//       id: [0, Validators.required],
//       label: ['', Validators.required],
//       link: ['', Validators.required]
//     });
//     control.setValue({
//       id: socialMedia.id,
//       label: socialMedia.label,
//       link: socialMedia.link
//     });
//     this.getSocialMedias(updateResumeForm).push(control);
//   }

//   private getEducations(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>) {
//     return <FormArray>updateResumeForm.get('educations');
//   }

//   private addEducation(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, education: ResumeEducationEntityModel) {
//     const control = this.formBuilder.group({
//       institutionName: ['', Validators.required],
//       fieldOfStudy: ['', Validators.required],
//       degree: ['', Validators.required],
//       graduationYear: ['', Validators.required]
//     });
//     control.setValue({
//       institutionName: education.institutionName,
//       fieldOfStudy: education.fieldOfStudy,
//       degree: education.degree,
//       graduationYear: education.graduationYear.toString()
//     });
//     this.getEducations(updateResumeForm).push(control);
//   }

//   private getExperience(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>) {
//     return updateResumeForm.get('experiences') as FormArray;
//   }

//   private addExperience(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, experience: ResumeExperienceEntityModel) {
//     const control = this.formBuilder.group({
//       companyName: ['', Validators.required],
//       jobTitle: ['', Validators.required],
//       startDate: ['', Validators.required],
//       endDate: [''],
//       experienceDescriptions: this.formBuilder.array([])
//     });
//     control.setValue({
//       companyName: experience.companyName,
//       jobTitle: experience.jobTitle,
//       startDate: experience.startDate.toString(),
//       endDate: experience.endDate?.toString() ?? null,
//       experienceDescriptions: []
//     });
//     this.getExperience(updateResumeForm).push(control);
//   }

//   getExperienceDescription(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, experienceIndex: number) {
//     return this.getExperience(updateResumeForm)
//       .at(experienceIndex)
//       .get('experienceDescriptions') as FormArray;
//   }

//   private addExperienceDescription(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, experienceDescription: ResumeExperienceDescriptionEntityModel, experienceIndex: number) {
//     const control = this.formBuilder.group({
//       description: ['', Validators.required],
//       order: [0, Validators.required],
//     });
//     control.setValue({
//       description: experienceDescription.description,
//       order: parseInt(experienceDescription.order)
//     });
//     const descriptions = this.getExperienceDescription(updateResumeForm, experienceIndex);
//     descriptions.push(control);
//   }

//   private getSkillGroup(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>) {
//     return updateResumeForm.get('skillGroups') as FormArray;
//   }

//   private addSkillGroup(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, skillGroup: ResumeSkillGroupEntityModel) {
//     const control = this.formBuilder.group({
//       name: ['', Validators.required],
//       order: ['', Validators.required],
//       skillElements: this.formBuilder.array([])
//     });
//     control.setValue({
//       name: skillGroup.name,
//       order: skillGroup.order,
//       skillElements: []
//     });
//     this.getSkillGroup(updateResumeForm).push(control);
//   }

//   private getSkillElement(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, experienceIndex: number) {
//     return this.getSkillGroup(updateResumeForm)
//       .at(experienceIndex)
//       .get('skillElements') as FormArray;
//   }

//   private addSkillElement(updateResumeForm: FormGroup<{
//     name: FormControl,
//     jobTitle: FormControl,
//     description: FormControl,
//     socialMedias: FormArray,
//     educations: FormArray,
//     experiences: FormArray,
//     skillGroups: FormArray
//   }>, experienceDescription: ResumeSkillElementEntityModel, experienceIndex: number) {
//     const control = this.formBuilder.group({
//       name: ['', Validators.required],
//       order: [0, Validators.required],
//     });
//     control.setValue({
//       name: experienceDescription.name,
//       order: parseInt(experienceDescription.order)
//     });
//     const descriptions = this.getSkillElement(updateResumeForm, experienceIndex);
//     descriptions.push(control);
//   }
// }
