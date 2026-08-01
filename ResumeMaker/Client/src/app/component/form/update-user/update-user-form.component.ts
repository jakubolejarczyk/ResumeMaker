import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { catchError, combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";

import { UserRequestModel } from "../../../model/request/user-request.model";
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-update-user-form-component',
  templateUrl: './update-user-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class UpdateUserFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  service = inject(UserService);

  updateUserForm = this.formBuilder.group({
    id: [0, Validators.required],
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit() {
    this.resetForm().subscribe();
  }

  onSubmit() {
    combineLatest({
      paramId: of(this.route.snapshot.paramMap.get('id')),
      form: of(this.updateUserForm)
    }).pipe(
      take(1),
      map(({ paramId, form }) => {
        if (!paramId) throw new Error('Parameter id was not defined!');
        if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
        const id = parseInt(paramId);
        return { id, form };
      }),
      filter(({ id, form }) => {
        if (form.valid) return true;
        throw new Error('Not all required fields have been set.');
      }),
      map(({ id, form }) => ({ id, value: form.value })),
      map(({ id, value }) => {
        const { email, firstName, lastName, city, country, phoneNumber } = value;
        if (!email) throw new Error('Email has not been set.');
        if (!firstName) throw new Error('First name has not been set.');
        if (!lastName) throw new Error('Last name has not been set.');
        if (!city) throw new Error('City has not been set.');
        if (!country) throw new Error('Country has not been set.');
        if (!phoneNumber) throw new Error('Phone number has not been set.');
        const request: UserRequestModel = { email, firstName, lastName, city, country, phoneNumber };
        return ({ id, request });
      }),
      concatMap(({ id, request }) => this.service.update$(id, request)),
      tap(() => this.updateUserForm.reset()),
      concatMap(() => this.resetForm()),
      catchError(error => {
        alert(error);
        return of(void 0);
      })
    ).subscribe();
  }

  private resetForm() {
    return of(this.route.snapshot.paramMap.get('id')).pipe(
      take(1),
      map(paramId => {
        if (!paramId) throw new Error('Parameter id was not defined!');
        if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
        return parseInt(paramId);
      }),
      concatMap(id => {
        return this.service.getUsers$().pipe(
          take(1),
          concatMap(users => {
            const userToUpdate = users.find(user => user.id === id);
            if (userToUpdate) return of(userToUpdate);
            throw new Error('User to update does not exits!');
          })
        );
      }),
      map(userToUpdate => {
        this.updateUserForm.controls.id.setValue(userToUpdate.id);
        this.updateUserForm.controls.email.setValue(userToUpdate.email);
        this.updateUserForm.controls.firstName.setValue(userToUpdate.firstName);
        this.updateUserForm.controls.lastName.setValue(userToUpdate.lastName);
        this.updateUserForm.controls.city.setValue(userToUpdate.city);
        this.updateUserForm.controls.country.setValue(userToUpdate.country);
        this.updateUserForm.controls.phoneNumber.setValue(userToUpdate.phoneNumber);
      })
    )
  }
}
