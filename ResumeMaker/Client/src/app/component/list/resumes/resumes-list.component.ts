import { Component, inject } from "@angular/core";
import { ResumeService } from "../../../service/resume.service";
import { ResumeEntityModel } from "../../../model/entity/resume-entity.model";

@Component({
  selector: 'app-resumes-list-component',
  templateUrl: './resumes-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class ResumesListComponent {
  service = inject(ResumeService);
  // router = inject(Router);

  resumes$ = this.service.getResumes$();

  onSelect(resume: ResumeEntityModel) {
    // this.service.select(company);
  }

  onUpdate(resume: ResumeEntityModel) {
    // this.router.navigate(['/company', company.id]);
  }

  onDelete(resume: ResumeEntityModel) {
    // this.service.delete$(company.id).subscribe();
  }
}
