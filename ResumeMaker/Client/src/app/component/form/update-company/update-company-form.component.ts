import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { AppStore } from "../../../old/app-store";
import { CompanyRequestService } from "../../../service/request/company-request.service";
import { UpdateCompanyRequestModel } from "../../../model/request/update-company-request.model";

@Component({
  selector: 'app-update-company-form-component',
  templateUrl: './update-company-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class UpdateCompanyFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  appStore = inject(AppStore);
  companyRequestService = inject(CompanyRequestService);
  route = inject(ActivatedRoute);

  updateCompanyForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    includeConsentClause: [false, Validators.required],
    customConsentClause: [''],
    recruitmentStatus: ['', Validators.required]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.companyRequestService.readCompany(id, this.updateCompanyForm);
  }

  onSubmit() {
    const { valid } = this.updateCompanyForm;
    if (!valid) {
      alert('Please fill in all required fields.');
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const userId = <number><unknown>id ?? -1;
    const { value } = this.updateCompanyForm;
    const request: UpdateCompanyRequestModel = {
      companyName: value.companyName ?? '',
      city: value.city ?? '',
      country: value.country ?? '',
      includeConsentClause: value.includeConsentClause ?? false,
      customConsentClause: value.customConsentClause ?? '',
      recruitmentStatus: value.recruitmentStatus ?? '',
      userId
    };
    this.companyRequestService.updateCompany(id, request);
  }
}
