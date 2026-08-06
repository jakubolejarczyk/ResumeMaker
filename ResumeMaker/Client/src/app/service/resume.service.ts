import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";

import { ResumeDal } from "../dal/resume.dal";
import { ResumeRequestModel } from "../model/request/resume-request.model";
import { UserState } from "../store/state/user.state";
import { ResponseModel } from "../model/response/response.model";
import { ResumeEntityModel } from "../model/entity/resume-entity.model";
import { DeselectResume, SelectResume, SetResumes } from "../store/actions/resume.actions";
import { ResumeState } from "../store/state/resume.state";

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private dal = inject(ResumeDal);
  private store = inject(Store);

  getSelectedResume$() {
    return this.store.select(ResumeState.getSelectedResume);
  }

  getResumes$() {
    return this.store.select(ResumeState.getResumes);
  }

  select(resume: ResumeEntityModel) {
    this.store.dispatch(new SelectResume(resume));
  }

  deselect$() {
    return combineLatest({
      selectedResume: this.getSelectedResume$(),
      resumes: this.getResumes$()
    }).pipe(
      take(1),
      map(({ selectedResume, resumes }) => {
        if (!selectedResume) return;
        const selectedResumeExists = resumes.some(resume => resume.id === selectedResume.id);
        if (selectedResumeExists) return;
        this.store.dispatch(new DeselectResume());
      })
    );
  }

  updateSelection$() {
    return combineLatest({
      selectedResume: this.getSelectedResume$(),
      resumes: this.getResumes$()
    }).pipe(
      take(1),
      map(({ selectedResume, resumes }) => {
        if (!selectedResume) return;
        const newSelectedResume = resumes.find(resume => resume.id === selectedResume.id);
        if (newSelectedResume) this.store.dispatch(new SelectResume(newSelectedResume));
      })
    );
  }

  create$(request: ResumeRequestModel) {
    return this.dal.create$(request).pipe(
      tap(response => alert(response.message)),
      filter(response => response.success),
      concatMap(() => this.readAllForUser$())
    );
  }

  readAllForUser$() {
    return this.store.select(UserState.getSelectedUser).pipe(
      take(1),
      concatMap(selectedUser => {
        if (selectedUser) {
          return this.dal.readAllForUser$(selectedUser.id);
        }
        const response: ResponseModel<ResumeEntityModel[]> = {
          success: false,
          message: 'No resumes found.',
          body: []
        };
        return of(response);
      }),
      concatMap(response => {
        const { success, body } = response;
        const companies = success ? body : [];
        return this.store.dispatch(new SetResumes(companies));
      })
    );
  }

  update$(id: number, request: ResumeRequestModel) {
    return this.dal.update$(id, request).pipe(
      tap(response => alert(response.message)),
      filter(response => response.success),
      concatMap(() => this.readAllForUser$()),
      concatMap(() => this.updateSelection$())
    );
  }

  delete$(id: number) {
    return this.dal.delete$(id).pipe(
      tap(response => alert(response.message)),
      filter(response => response.success),
      concatMap(() => this.readAllForUser$()),
      concatMap(() => this.deselect$())
    );
  }
}
