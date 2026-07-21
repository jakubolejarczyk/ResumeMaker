import { Component } from "@angular/core";

@Component({
  selector: 'app-main-component',
  templateUrl: 'main.component.html',
  styleUrl: 'main.component.css',
  standalone: false
})
export class MainComponent {
  userId: number = -1;

  setUserId(userId: number) {
    this.userId = userId;
  }
}
