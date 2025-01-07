import {  createSelector } from "@ngrx/store"
import { DepartmentState } from "./department-reducers";
import { AppState } from "../store";
 

const feature = (state: AppState) => state.department;

export const departmentSelector = createSelector(
  feature,
  (state: DepartmentState) => state.departments
);

export const departmentByIdSelector = (id: string) => createSelector(
  feature,
  (state: DepartmentState) => state.departments.filter(x=>x._id == id)[0]
);