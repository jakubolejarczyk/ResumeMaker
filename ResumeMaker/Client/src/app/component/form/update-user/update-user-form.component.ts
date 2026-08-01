import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { concatMap, filter, map, of, take } from "rxjs";

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
    of(this.route.snapshot.paramMap.get('id')).pipe(
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
    ).subscribe();
  }

  onSubmit() {
    of(this.route.snapshot.paramMap.get('id')).pipe(
      take(1),
      map(param => {
        if (!param) throw new Error('Id parameter was not defined!');
        if (Number.isNaN(param)) throw new Error('Id parameter is not a number!');
        return parseInt(param);
      }),
      map(id => {
        const { valid } = this.updateUserForm;
        if (!valid) {
          alert('Not all required fields have been completed.');
          return;
        }
        if (!id) {
          alert('Id was not defined.');
          return;
        }
        const { value } = this.updateUserForm;
        const request: UserRequestModel = {
          email: value.email ?? '',
          firstName: value.firstName ?? '',
          lastName: value.lastName ?? '',
          city: value.city ?? '',
          country: value.country ?? '',
          phoneNumber: value.phoneNumber ?? ''
        };
        return this.service.update$(id, request);
      }),
      filter(request => request !== undefined),
      concatMap(request => request)
    ).subscribe(response => {
      const { message } = response;
      alert(message);
    });
  }
}
