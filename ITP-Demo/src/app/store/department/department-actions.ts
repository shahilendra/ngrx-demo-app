import { createAction, props } from "@ngrx/store";
import { Department } from "./department.model";

export const loadDepartment = createAction('[Department] Load Department');
export const loadDepartmentSuccess = createAction('[Department] Load Department Success', props<{ departments: Department[]}>());
export const loadDepartmentFailure = createAction('[Department] Load Department Failure', props<{ error: string }>());

export const loadDepartmentById = createAction('[Department] Load By Id Department', props<{id: string}>());
export const loadDepartmentByIdSuccess = createAction('[Department] Load By Id Department Success', props<{ department: Department}>());

export const addDepartment = createAction('[Department] Add Department', props<{department: Department}>());
export const addDepartmentSuccess = createAction('[Department] Add Department Success', props<{ departments: Department[]}>());
export const addDepartmentFailure = createAction('[Department] Add Department Failure', props<{ error: string }>());

export const deleteDepartment = createAction('[Department] Delete Department', props<{ id: string }>());
export const deleteDepartmentSuccess = createAction('[Department] Delete Department Success', props<{ id: string}>());
export const deleteDepartmentFailure = createAction('[Department] Delete Department Failure', props<{ error: string }>());
