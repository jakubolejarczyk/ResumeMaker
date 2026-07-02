import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [FormsModule],
})
export class App {
  private http = inject(HttpClient);

  userId = '';

  resumeId = '';

  click() {
    this.http
      .get(`https://localhost:7116/api/resume/${this.userId}/resumes/${this.resumeId}`)
      .subscribe(res => console.log(res));
    this.userId = '';
    this.resumeId = '';
  }
}
