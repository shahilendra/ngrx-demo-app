import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DepartmentService } from './department-service.service';
import * as DeparmentActions from './department-actions';
import { Employee } from '../../employee.model';

@Injectable()
export class DepartmentEffects {
  
  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeparmentActions.loadDepartment),
      mergeMap(() =>
        this.departmentService.getAll().pipe(
          map((departments) => DeparmentActions.loadDepartmentSuccess({departments})),
          catchError((error) =>
            of(DeparmentActions.loadDepartmentFailure({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private departmentService: DepartmentService) {}
}
