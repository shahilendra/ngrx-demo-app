// import {  createSelector } from "@ngrx/store"
// import { DepartmentState } from "./department-reducers";
// import { AppState } from "../store";
 

// const feature = (state: AppState) => state.department;

// export const departmentSelector = createSelector(
//   feature,
//   (state: DepartmentState) => state.departments
// );

// export const departmentByIdSelector = (id: string) => createSelector(
//   feature,
//   (state: DepartmentState) => state.departments.filter(x=>x._id == id)[0]
// );

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromDepartment from './department-reducers';

export interface DepartmentState {
  users: fromDepartment.DepartmentState;
}

export const reducers: ActionReducerMap<DepartmentState> = {
  users: fromDepartment.departmentReducer,
};

export const selectDepartmentState = createFeatureSelector<fromDepartment.DepartmentState>('departments');

export const selectDepartmentIds = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);
export const selectDepartmentEntities = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentEntities
);
export const selectAllDepartments = createSelector(
  selectDepartmentState,
  fromDepartment.selectAllDepartments
);
export const selectDepartmentTotal = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentTotal
);
export const selectCurrentDepartmentId = createSelector(
  selectDepartmentState,
  fromDepartment.getSelectedDepartmentId
);
export const departmentExists = (id: string) =>
  createSelector(selectDepartmentEntities, (entities) => !!entities[id]);

export const departmentById = (id: string) =>
  createSelector(selectDepartmentEntities, (entities) => entities[id]);


export const selectCurrentDepartment = createSelector(
  selectDepartmentEntities,
  selectCurrentDepartmentId,
  (departmentEntities, departmentId) => departmentId && departmentEntities[departmentId]
);