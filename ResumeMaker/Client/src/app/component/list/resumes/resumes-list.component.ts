import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AppStore } from "../../../store/app-store";
import { ResumeRequestService } from "../../../service/request/resume-request.service";
import { ResumeEntityModel } from "../../../model/entity/resume-entity.model";

@Component({
  selector: 'app-resumes-list-component',
  templateUrl: './resumes-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class ResumesListComponent implements OnInit, OnDestroy {
  appStore = inject(AppStore);
  resumeRequestService = inject(ResumeRequestService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  resumes: ResumeEntityModel[] = [];

  sub!: Subscription;

  ngOnInit() {
    this.sub = this.appStore.resumes.subscribe(resumes => {
      this.resumes = resumes;
      this.cdr.detectChanges();
    });
    this.resumeRequestService.readResumes();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // onSelect(user: CompanyEntityModel) {
  //   this.appStore.company.next(user);
  // }

  // onUpdate(userId: number) {
  //   this.router.navigate(['/company', userId]);
  // }

  // onDelete(companyId: number) {
  //   this.companyRequestService.deleteCompany(companyId);
  // }
}
