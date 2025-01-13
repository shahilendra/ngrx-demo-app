import { Action, ActionReducer } from "@ngrx/store";
import { EmployeeEffects } from "./employee/employee-effects";
import { employeeReducer, EmployeeState } from "./employee/employee-reducers";
import { DepartmentEffects } from "./department/department-effects";
import { departmentReducer, DepartmentState } from "./department/department-reducers";


export interface AppState {
  employees: EmployeeState,
  departments: DepartmentState
}

export interface AppStore {
    employees: ActionReducer<EmployeeState, Action>;
    departments: ActionReducer<DepartmentState, Action>;
}

export const appStore: AppStore = {
    employees: employeeReducer,
    departments: departmentReducer
}

export const appEffects = [EmployeeEffects, DepartmentEffects];
