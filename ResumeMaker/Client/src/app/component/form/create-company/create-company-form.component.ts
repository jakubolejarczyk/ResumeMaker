// import { Component, inject } from "@angular/core";
// import { FormBuilder, Validators } from "@angular/forms";

// import { AppStore } from "../../../old/app-store";
// import { CreateCompanyRequestModel } from "../../../model/request/create-company-request.model";
// import { CompanyRequestService } from "../../../service/request/company-request.service";

// @Component({
//   selector: 'app-create-company-form-component',
//   templateUrl: './create-company-form.component.html',
//   styleUrl: '../base/base-form.component.css',
//   standalone: false
// })
// export class CreateCompanyFormComponent {
//   formBuilder = inject(FormBuilder);
//   appStore = inject(AppStore);
//   companyRequestService = inject(CompanyRequestService);

//   createCompanyForm = this.formBuilder.group({
//     companyName: ['', Validators.required],
//     city: ['', Validators.required],
//     country: ['', Validators.required],
//     includeConsentClause: [false, Validators.required],
//     customConsentClause: [''],
//     recruitmentStatus: ['', Validators.required]
//   });

//   onSubmit() {
//     const { valid } = this.createCompanyForm;
//     if (!valid) {
//       alert('Please fill in all required fields.');
//       return;
//     }
//     const { value } = this.createCompanyForm;
//     const userId = this.appStore.user.value?.id ?? -1;
//     const request: CreateCompanyRequestModel = {
//       companyName: value.companyName ?? '',
//       city: value.city ?? '',
//       country: value.country ?? '',
//       includeConsentClause: value.includeConsentClause ?? false,
//       customConsentClause: value.customConsentClause ?? '',
//       recruitmentStatus: value.recruitmentStatus ?? '',
//       userId
//     };
//     this.companyRequestService.createCompany(request);
//     this.createCompanyForm.reset();
//     this.createCompanyForm.controls.includeConsentClause.setValue(false);
//   }
// }
