import { Component, Signal } from '@angular/core';
import { Department } from '../store/department/department.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { departmentSelector } from '../store/department/department-selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import * as DepartmentActions from '../store/department/department-actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departments$: Signal<Department[] | undefined>;
  isLoading$: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.departments$ = toSignal(this.store.select(departmentSelector)); // observable converted to signal
    this.isLoading$ = toSignal(this.store.select((state) => state.employee.loading));
    this.loadEmployee();
  }
  loadEmployee() {
    this.store.dispatch(DepartmentActions.loadDepartment());
  }
  addDepartment() {
    const department: Department = { _id: '', name: `HR`, desc: 'HR' };
    this.store.dispatch(DepartmentActions.addDepartment({ department }));
  }
  deleteEmployee(id: string) {
    if(confirm('Would you like to delete this department?')){
      this.store.dispatch(
        DepartmentActions.deleteDepartment({id:id})
      );
    }
  }
}
