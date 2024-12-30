import { createAction, props } from "@ngrx/store";
import { Department } from "./department.model";

export const loadDepartment = createAction('[Department] Load Department');
export const loadDepartmentSuccess = createAction('[Department] Load Department Success', props<{ departments: Department[]}>());
export const loadDepartmentFailure = createAction('[Department] Load Department Failure', props<{ error: string }>());
