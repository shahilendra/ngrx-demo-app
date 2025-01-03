import {  createSelector } from "@ngrx/store"
import { DepartmentState } from "./department-reducers";
import { AppState } from "../employee-store";
 

const feature = (state: AppState) => state.department;

export const departmentSelector = createSelector(
  feature,
  (state: DepartmentState) => state.departments
);