import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../employee.model';
import * as EmployeeActions from './employee-actions';
export const todoFeatureKey = 'employee';
export interface EmployeeState {
employees: Employee[];
loading: boolean;
error: string;
}
export const initialState: EmployeeState = {
employees: [],
loading: false,
error: ''
};
export const employeeReducer = createReducer(
initialState,

on(EmployeeActions.loadEmployees, state => ({ ...state, loading: true })),

on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) =>({ ...state, employees, loading: false })),

on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({ ...state, error, loading: false })),

on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({ ...state, employees: [...state.employees, employee] })),

on(EmployeeActions.addEmployeeFailure, (state, { error }) => ({ ...state, error, loading: false })),


on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({ ...state, employees: state.employees.map(t => t._id === employee._id ? employee : t) })),

on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({ ...state, error, loading: false })),


on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({ ...state, employees: state.employees.filter(t => t._id !== id) })),

on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
