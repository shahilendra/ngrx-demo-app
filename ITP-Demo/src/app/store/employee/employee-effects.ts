import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EmployeeServiceService } from '../../employee-service.service';
import * as EmployeeActions from './employee-actions';
import { Employee } from '../../employee.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EmployeeEffects {
  
  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.employeeServiceService.getAll().pipe(
          map((employees) => {
            this.toastr.success('Employee load successfully!', 'Employee Load!');
            return EmployeeActions.loadEmployeesSuccess({employees});
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Employee Load!');
            return of(EmployeeActions.loadEmployeesFailure({ error: error.message }))
          }
          )
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      exhaustMap(action =>
        this.employeeServiceService.create(action.employee).pipe(
          map((employee) => {
            this.toastr.success('Empolyee Added Successfully!', 'Employee Added!');
            return EmployeeActions.addEmployeeSuccess({employee})
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Employee Added!');
            return of(EmployeeActions.addEmployeeFailure({ error: error.message }))
          })
        )
      )
    )
  );
  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      exhaustMap(action =>
        this.employeeServiceService.update(action.employee).pipe(
          map((employee) => {
            this.toastr.success('Employee Updated Successfully!', 'Employee Update!');
            return EmployeeActions.updateEmployeeSuccess({employee})
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Employee Updated!');
           return of(EmployeeActions.updateEmployeeFailure({ error: error.message }));
          }
            
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      exhaustMap(action =>
        this.employeeServiceService.delete(action.id).pipe(
          map((data) => {
            this.toastr.success(data.message, 'Employee Delete!');
            return EmployeeActions.deleteEmployeeSuccess({id:action.id})
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Employee Delete!');
            return of(EmployeeActions.deleteEmployeeFailure({ error: error.message }))
          }
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private employeeServiceService: EmployeeServiceService, private toastr: ToastrService) {}
}
