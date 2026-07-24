import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { UserEntityModel } from "../../model/entity/user-entity.model";
import { AppStore } from "../../store/app-store";

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

  sub!: Subscription;

  ngOnInit() {
    this.sub = this.appStore.user.subscribe(user => {
      this.user = user;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
