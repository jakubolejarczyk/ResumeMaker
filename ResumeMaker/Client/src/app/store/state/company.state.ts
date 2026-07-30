import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";

import { CompanyStateModel } from "../../model/state/company-state.model";
import { DeselectCompany, SelectCompany, SetCompanies } from "../actions/company.actions";

@State<CompanyStateModel>({
  name: 'companyState',
  defaults: {
    selectedCompany: undefined,
    companies: [],
  }
})
@Injectable()
export class CompanyState {
  @Selector()
  static getUsers(state: CompanyStateModel) {
    return state.companies;
  }

  @Selector()
  static getSelectedCompany(state: CompanyStateModel) {
    return state.selectedCompany;
  }

  @Action(SetCompanies)
  setCompanies(context: StateContext<CompanyStateModel>, action: SetCompanies) {
    const state = context.getState();
    context.setState({
      ...state,
      companies: action.companies
    });
  }

  @Action(DeselectCompany)
  deselectCompany(context: StateContext<CompanyStateModel>) {
    const state = context.getState();
    context.setState({
      ...state,
      selectedCompany: undefined
    });
  }

  @Action(SelectCompany)
  selectUser(context: StateContext<CompanyStateModel>, action: SelectCompany) {
    const state = context.getState();
    context.setState({
      ...state,
      selectedCompany: action.company
    });
  }
}
