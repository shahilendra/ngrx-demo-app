import { Action, ActionReducer } from "@ngrx/store";
import { EmployeeEffects } from "./employee/employee-effects";
import { employeeReducer, EmployeeState } from "./employee/employee-reducers";
import { DepartmentEffects } from "./department/department-effects";
import { departmentReducer, DepartmentState } from "./department/department-reducers";


export interface AppState {
  employee: EmployeeState,
  department: DepartmentState
}

export interface AppStore {
    employee: ActionReducer<EmployeeState, Action>;
    department: ActionReducer<DepartmentState, Action>;
}

export const appStore: AppStore = {
    employee: employeeReducer,
    department: departmentReducer
}

export const appEffects = [EmployeeEffects, DepartmentEffects];
