import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { UserEntityModel } from "../../model/entity/user-entity.model";
import { AppStore } from "../../old/app-store";
import { CompanyEntityModel } from "../../model/entity/company-entity.model";
import { ResumeEntityModel } from "../../model/entity/resume-entity.model";

@Component({
  selector: 'app-root-component',
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
  standalone: false
})
export class RootComponent implements OnInit, OnDestroy {
  appStore = inject(AppStore);
  cdr = inject(ChangeDetectorRef);

  user: UserEntityModel | undefined;

  company: CompanyEntityModel | undefined;

  resume: ResumeEntityModel | undefined;

  subUser!: Subscription;
  subCompany!: Subscription;
  subResume!: Subscription;

  ngOnInit() {
    this.subUser = this.appStore.user.subscribe(user => {
      this.user = user;
      this.cdr.detectChanges();
    });
    this.subCompany = this.appStore.company.subscribe(company => {
      this.company = company;
      this.cdr.detectChanges();
    });
    this.subResume = this.appStore.resume.subscribe(resume => {
      this.resume = resume;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subUser.unsubscribe();
    this.subCompany.unsubscribe();
    this.subResume.unsubscribe();
  }
}
