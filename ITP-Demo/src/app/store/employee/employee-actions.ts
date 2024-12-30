import { createAction, props } from '@ngrx/store';
import { Employee } from '../../employee.model';

export const loadEmployees = createAction('[Employee] Load Employee');
export const loadEmployeesSuccess = createAction('[Employee] Load Employee Success', props<{ employees: Employee[]}>());
export const loadEmployeesFailure = createAction('[Employee] Load Employee Failure', props<{ error: string }>());

export const addEmployee = createAction('[Employee] Add Employee', props<{ employee: Employee }>());
export const addEmployeeSuccess = createAction('[Employee] Add Employee Success', props<{ employee: Employee}>());
export const addEmployeeFailure = createAction('[Employee] Add Employee Failure', props<{ error: string }>());

export const updateEmployee = createAction('[Employee] Update Employee', props<{ employee: Employee }>());
export const updateEmployeeSuccess = createAction('[Employee] Update Employee Success', props<{ employee: Employee}>());
export const updateEmployeeFailure = createAction('[Employee] Update Employee Failure', props<{ error: string }>());

export const deleteEmployee = createAction('[Employee] Delete Employee', props<{ id: string }>());
export const deleteEmployeeSuccess = createAction('[Employee] Delete Employee Success', props<{ id: string}>());
export const deleteEmployeeFailure = createAction('[Employee] Delete Employee Failure', props<{ error: string }>());
