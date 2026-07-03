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
      .get(`https://localhost:7116/api/resume/${this.userId}`, {
        responseType: 'blob',
      })
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.pdf'; // nazwa pobieranego pliku

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.userId = '';
    this.resumeId = '';
  }
}
