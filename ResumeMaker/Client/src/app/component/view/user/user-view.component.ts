import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-user-view-component',
  templateUrl: 'user-view.component.html',
  styleUrl: 'user-view.component.css',
  standalone: false
})
export class UserViewComponent {
  @Output() userId = new EventEmitter();

  emitUserId(userId: number) {
    this.userId.emit(userId);
  }
}
