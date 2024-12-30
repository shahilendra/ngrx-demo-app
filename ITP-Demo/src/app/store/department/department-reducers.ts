import { createReducer, on } from '@ngrx/store';
import { Department } from './department.model';
import * as DepartmentActions from './department-actions';
export const todoFeatureKey = 'departments';
export interface DepartmentState {
departments: Department[];
loading: boolean;
error: string;
}
export const initialDepartmentState: DepartmentState = {
departments: [],
loading: false,
error: ''
};
export const departmentReducer = createReducer(
    initialDepartmentState,

    on(DepartmentActions.loadDepartment, state => ({ ...state, loading: true })),

    on(DepartmentActions.loadDepartmentSuccess, (state, { departments }) =>({ ...state, departments, loading: false })),

    on(DepartmentActions.loadDepartmentFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
