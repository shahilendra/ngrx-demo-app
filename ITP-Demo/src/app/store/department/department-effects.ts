import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DepartmentService } from './department-service.service';
import * as DeparmentActions from './department-actions';
import { Employee } from '../../employee.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DepartmentEffects {
  
  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeparmentActions.loadDepartment),
      mergeMap(() =>
        this.departmentService.getAll().pipe(
          map((departments) => {
            this.toastr.success('Departments load successfully!', 'Departments Load!');
            return DeparmentActions.loadDepartmentSuccess({departments});
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Departments Load!');
           return of(DeparmentActions.loadDepartmentFailure({ error: error.message }));
          })
        )
      )
    )
  );
  loadEmployeeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeparmentActions.loadDepartmentById),
      mergeMap((action) =>
        this.departmentService.getById(action.id).pipe(
          map((department) => {
            this.toastr.success('Department load successfully!', 'Department Load!');
            return DeparmentActions.loadDepartmentByIdSuccess({department});
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Department Load!');
           return of(DeparmentActions.loadDepartmentFailure({ error: error.message }));
          })
        )
      )
    )
  );
  createDepartment$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DeparmentActions.addDepartment),
        exhaustMap(action =>
          this.departmentService.create(action.department).pipe(
            map((department) => {
             this.toastr.success('Department Added Successfully!', 'Department Added!');
              return DeparmentActions.addDepartmentSuccess({department});
            }),
            catchError((error) => {
              alert(error.message);
              this.toastr.error(error.message, 'Department Added!');
              return of(DeparmentActions.loadDepartmentFailure({ error: error.message }))
            })
          )
        )
      )
    );
    updateEmployee$ = createEffect(() =>
        this.actions$.pipe(
          ofType(DeparmentActions.updateDepartment),
          exhaustMap(action =>
            this.departmentService.update(action.department).pipe(
              map((department) => {
                this.toastr.success('Department Updated Successfully!', 'Department Update!');
                return DeparmentActions.updateDepartmentSuccess({department})
              }),
              catchError((error) => {
                this.toastr.error(error.message, 'Department Updated!');
               return of(DeparmentActions.loadDepartmentFailure({ error: error.message }));
              }
                
              )
            )
          )
        )
      );
    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
          ofType(DeparmentActions.deleteDepartment),
          exhaustMap(action =>
            this.departmentService.delete(action.id).pipe(
              map((data) => {
                this.toastr.success(data.message, 'Department Delete!');
                return DeparmentActions.deleteDepartmentSuccess({id:action.id})
              }),
              catchError((error) => {
                this.toastr.error(error.message, 'Department Delete!');
                return of(DeparmentActions.loadDepartmentFailure({ error: error.message }))
              }
              )
            )
          )
        )
      );
  constructor(private actions$: Actions, private departmentService: DepartmentService, private toastr: ToastrService) {}
}
