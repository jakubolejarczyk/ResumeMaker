import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-create-user-form-component',
  templateUrl: './create-user-form.component.html',
  standalone: false
})
export class CreateUserFormComponent {
  name = new FormControl('');

  updateName() {
    this.name.setValue('Nancy');
  }
}
