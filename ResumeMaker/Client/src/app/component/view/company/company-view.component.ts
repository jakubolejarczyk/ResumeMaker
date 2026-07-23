import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

// import { CompaniesStore } from "../../../store/companies.store";
import { tap, switchMap } from "rxjs";
// import { ResponseModel } from "../../../model/response/response.model";
// import { CompanyEntityModel } from "../../../model/entity/company-entity.model";
// import { UserStore } from "../../../store/user.store";

@Component({
  selector: 'app-company-view-component',
  templateUrl: './company-view.component.html',
  styleUrl: './company-view.component.css',
  standalone: false
})
export class CompanyViewComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  route = inject(ActivatedRoute);
  // companiesStore = inject(CompaniesStore);
  // userStore = inject(UserStore);

  companyForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    includeConsentClause: [false, Validators.required],
    customConsentClause: ['', Validators.required],
    recruitmentStatus: ['', Validators.required]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // this.httpClient.get<ResponseModel<CompanyEntityModel>>(`http:localhost:5038/api/company/${id}`).subscribe(response => {
    //   if (response.success) {
    //     this.companyForm.controls.companyName.setValue(response.body.companyName);
    //     this.companyForm.controls.city.setValue(response.body.city);
    //     this.companyForm.controls.country.setValue(response.body.country);
    //     this.companyForm.controls.includeConsentClause.setValue(response.body.includeConsentClause);
    //     this.companyForm.controls.customConsentClause.setValue(response.body.customConsentClause);
    //     this.companyForm.controls.recruitmentStatus.setValue(response.body.recruitmentStatus);
    //   }
    // });
  }

  onSubmit() {
    if (!this.companyForm.valid) return;
    // const userId = this.userStore.getValue();
    const userId = 1;
    const { value } = this.companyForm;
    const body = { ...value, userId };
    const id = this.route.snapshot.paramMap.get('id');
    // this.httpClient.patch<ResponseModel<CompanyEntityModel>>(`http:localhost:5038/api/company/${id}`, body)
    //   .pipe(
    //     tap(() => {
    //       this.httpClient.get<ResponseModel<CompanyEntityModel>>(`http:localhost:5038/api/company/${id}`).subscribe(response => {
    //         if (response.success) {
    //           this.companyForm.controls.companyName.setValue(response.body.companyName);
    //           this.companyForm.controls.city.setValue(response.body.city);
    //           this.companyForm.controls.country.setValue(response.body.country);
    //           this.companyForm.controls.includeConsentClause.setValue(response.body.includeConsentClause);
    //           this.companyForm.controls.customConsentClause.setValue(response.body.customConsentClause);
    //           this.companyForm.controls.recruitmentStatus.setValue(response.body.recruitmentStatus);
    //         }
    //       });
    //     }),
    //     switchMap(response => {
    //       if (response.success) {
    //         alert(response.message);
    //         return this.httpClient.get<ResponseModel<CompanyEntityModel[]>>(`http:localhost:5038/api/company/user/${userId}`);
    //       } else {
    //         throw new Error(response.message);
    //       }
    //     })
    //   )
    //   .subscribe({
    //     next: response => {
    //       this.companiesStore.data.next(response.body);
    //     },
    //     error: err => {
    //       alert(err);
    //     }
    //   });
  }
}
