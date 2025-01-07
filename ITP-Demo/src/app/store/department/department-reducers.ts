import { createReducer, on } from '@ngrx/store';
import { Department } from './department.model';
import * as DepartmentActions from './department-actions';
import { map } from 'rxjs';
export const todoFeatureKey = 'departments';
export interface DepartmentState {
departments: Department[];
entities: {[key:string]: Department};
loading: boolean;
error: string;
}
export const initialDepartmentState: DepartmentState = {
departments: [],
entities: {},
loading: false,
error: ''
};
export const departmentReducer = createReducer(
    initialDepartmentState,

    on(DepartmentActions.loadDepartment, state => ({ ...state, loading: true })),

    on(DepartmentActions.loadDepartmentSuccess, (state, { departments }) =>({ ...state, departments, entities: departments.reduce((a, v) => ({ ...a, [v._id]: v}), {}) ,  loading: false })),

    on(DepartmentActions.loadDepartmentFailure, (state, { error }) => ({ ...state, error, loading: false })),
    
    on(DepartmentActions.addDepartmentSuccess, (state, { departments }) =>({ ...state, departments, loading: false })),

    on(DepartmentActions.addDepartmentFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(DepartmentActions.deleteDepartmentSuccess, (state, { id }) => ({ ...state, departments: state.departments.filter(t => t._id !== id) })),
    
    on(DepartmentActions.deleteDepartmentFailure, (state, { error }) => ({ ...state, error, loading: false }))
    
);
