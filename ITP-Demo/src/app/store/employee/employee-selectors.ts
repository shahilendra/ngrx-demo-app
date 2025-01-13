import {  createSelector } from "@ngrx/store"
import { EmployeeState } from "./employee-reducers";
import { AppState } from "../store";
 

const feature = (state: AppState) => state.employees;

export const employeeSelector = createSelector(
  feature,
  (state: EmployeeState) => state.employees
);