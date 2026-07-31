import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { catchError, concatMap, filter, map, of, take, tap } from "rxjs";

import { UserService } from "../../../service/user.service";
import { UserRequestModel } from "../../../model/request/user-request.model";

@Component({
  selector: 'app-create-user-form-component',
  templateUrl: './create-user-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class CreateUserFormComponent {
  formBuilder = inject(FormBuilder);
  service = inject(UserService);

  createUserForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  onSubmit() {
    of(this.createUserForm).pipe(
      take(1),
      filter(form => {
        if (form.valid) return true;
        throw new Error('Not all required fields have been set.');
      }),
      map(form => form.value),
      map(value => {
        const { email, firstName, lastName, city, country, phoneNumber } = value;
        if (!email) throw new Error('Email has not been set.');
        if (!firstName) throw new Error('First name has not been set.');
        if (!lastName) throw new Error('Last name has not been set.');
        if (!city) throw new Error('City has not been set.');
        if (!country) throw new Error('Country has not been set.');
        if (!phoneNumber) throw new Error('Phone number has not been set.');
        const request: UserRequestModel = { email, firstName, lastName, city, country, phoneNumber };
        return request;
      }),
      concatMap(request => this.service.create$(request)),
      tap(() => this.createUserForm.reset()),
      catchError(error => {
        alert(error);
        return of(void 0);
      })
    ).subscribe();
  }
}
