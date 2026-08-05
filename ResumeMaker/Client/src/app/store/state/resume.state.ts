import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";

import { ResumeStateModel } from "../../model/state/resume-state.model";
import { DeselectResume, SelectResume, SetResumes } from "../actions/resume.actions";

@State<ResumeStateModel>({
  name: 'resumeState',
  defaults: {
    selectedResume: undefined,
    resumes: [],
  }
})
@Injectable()
export class ResumeState {
  @Selector()
  static getResumes(state: ResumeStateModel) {
    return state.resumes;
  }

  @Selector()
  static getSelectedResume(state: ResumeStateModel) {
    return state.selectedResume;
  }

  @Action(SetResumes)
  setResumes(context: StateContext<ResumeStateModel>, action: SetResumes) {
    const state = context.getState();
    context.setState({
      ...state,
      resumes: action.resumes
    });
  }

  @Action(DeselectResume)
  deselectResume(context: StateContext<ResumeStateModel>) {
    const state = context.getState();
    context.setState({
      ...state,
      selectedResume: undefined
    });
  }

  @Action(SelectResume)
  selectResume(context: StateContext<ResumeStateModel>, action: SelectResume) {
    const state = context.getState();
    context.setState({
      ...state,
      selectedResume: action.resume
    });
  }
}
