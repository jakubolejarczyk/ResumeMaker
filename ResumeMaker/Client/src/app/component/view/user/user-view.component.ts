import { Component } from "@angular/core";

@Component({
  selector: 'app-user-view-component',
  templateUrl: 'user-view.component.html',
  styleUrl: 'user-view.component.css',
  standalone: false
})
export class UserViewComponent {
  showUserForm = false;

  switchUserForm() {
    this.showUserForm = !this.showUserForm;
  }
}
