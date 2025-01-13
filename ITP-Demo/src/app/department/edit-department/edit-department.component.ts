import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { departmentById, departmentExists } from '../../store/department/department-selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../store/department/department.model';
import { mergeMap, Observable } from 'rxjs';
import { addDepartment, loadDepartmentById, updateDepartment } from '../../store/department/department-actions';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css'
})
export class EditDepartmentComponent implements OnInit {
  departmentId!: string;
  department$!: Observable<Department | undefined>;
  isDepartmentStore$!: Observable<boolean>; 
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl('')
  });
  submitted = false;
  @ViewChild('myForm') myForm!: NgForm;
  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {
    
    }
    ngOnInit() {
      // Get route parameters
      this.departmentId = this.route.snapshot.paramMap.get('id') ?? '';;
      console.log('Department ID:', this.departmentId);
       
      this.isDepartmentStore$ = this.store.pipe(select(departmentExists(this.departmentId)));
      this.department$ = this.isDepartmentStore$.pipe(
        mergeMap((isDepartmentExist)=> {
          if(!isDepartmentExist) {
            console.log(`Product from api!`);
            this.store.dispatch(loadDepartmentById({id: this.departmentId}))
          }
          return this.store.pipe(
            select(departmentById(this.departmentId))
          );
        })
      );
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
      this.department$.subscribe((department) => {
        if (department) {
          this.form.patchValue({
            id: department._id,
            name: department.name,
            desc: department.desc,
          });
        }
      });
    }
    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
    onSubmit(): void {
        this.submitted = true;
    
        if (this.form.invalid) {
          return;
        }
    
        console.log(JSON.stringify(this.form.value, null, 2));
        const department: Department = {...this.form.value, ...{_id: this.departmentId}};
        this.store.dispatch(updateDepartment({ department }));
        this.submitted = false;
        this.form.reset();
        this.myForm.resetForm();
        this.router.navigate(['/departments'])
      }
      onReset(): void {
        this.submitted = false;
        this.form.reset();
        this.myForm.resetForm();
      }
    ngOnDestroy(): void {
      console.log('ngOnDestroy called');
    }
}
