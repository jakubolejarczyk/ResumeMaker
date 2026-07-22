import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-company-form-component',
  templateUrl: './create-company-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class CreateCompanyFormComponent {
  formBuilder = inject(FormBuilder);

  createCompanyForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    includeConsentClause: [false, Validators.required],
    customConsentClause: ['', Validators.required],
    recruitmentStatus: ['', Validators.required]
  });

  onSubmit() {
    console.log(this.createCompanyForm.value);
  }
}
