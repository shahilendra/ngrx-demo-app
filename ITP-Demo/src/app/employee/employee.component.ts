import { Component, Signal } from '@angular/core';
import { Employee } from '../employee.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { employeeSelector } from '../store/employee/employee-selectors';
import * as EmployeeActions from '../store/employee/employee-actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees$: Signal<Employee[] | undefined>;
  isLoading$: Signal<boolean | undefined>;
  myForm!: FormGroup;
  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['Sammy', Validators.required],
      age: ['', [Validators.required]]
    });
  }
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.employees$ = toSignal(this.store.select(employeeSelector)); // observable converted to signal
    this.isLoading$ = toSignal(this.store.select((state) => state.employee.loading));
    this.loadEmployee();
  }
  onSubmit(form: FormGroup) {
    const employee: Employee = { _id: '', name: form.value.name, age: form.value.age };
    this.store.dispatch(EmployeeActions.addEmployee({ employee }));
    this.myForm.reset();
  }
  loadEmployee() {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }

  addEmployee() {
    const employee: Employee = { _id: '', name: `Ragini Udainia`, age: 32 };
    this.store.dispatch(EmployeeActions.addEmployee({ employee }));
  }

  updateEmployee(employee: Employee) {
    this.store.dispatch(
      EmployeeActions.updateEmployee({ employee: { ...employee, age: 31} })
    );
  }
  deleteEmployee(id: string) {
    if(confirm('Would you like to delete this employee?')){
      this.store.dispatch(
        EmployeeActions.deleteEmployee({id:id})
      );
    }
  }
}
