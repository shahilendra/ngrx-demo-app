import { Component, Signal, ViewChild } from '@angular/core';
import { Department } from '../store/department/department.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { departmentExists, selectAllDepartments } from '../store/department/department-selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import * as DepartmentActions from '../store/department/department-actions';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departments$: Signal<Department[] | undefined>;
  isLoading$: Signal<boolean | undefined>;
  form: FormGroup = new FormGroup({
      name: new FormControl(''),
      desc: new FormControl('')
    });
    submitted = false;
    @ViewChild('myForm') myForm!: NgForm;
  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    this.departments$ = toSignal(this.store.select(selectAllDepartments)); // observable converted to signal
    this.isLoading$ = toSignal(this.store.select((state) => state.departments.loading));
    this.loadDepartment();
     this.form = this.formBuilder.group(
          {
            name: ['', Validators.required],
            desc: [
              '',
              [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
              ],
            ]
          }
        );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  loadDepartment() {
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

  onSubmit(): void {
    debugger;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    const department: Department = {...this.form.value };
    this.store.dispatch(DepartmentActions.addDepartment({ department }));
    this.submitted = false;
    this.form.reset();
    this.myForm.resetForm();
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.myForm.resetForm();
  }
}
