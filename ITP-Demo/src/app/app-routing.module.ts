import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home.component';
import { SalesComponent } from './sales.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'employees',
        component: EmployeeComponent
      },
      {
        path: 'add-employees',
        component: AddEmployeeComponent
      },
      {
        path: 'departments',
        component: DepartmentComponent
      },
      {
        path: 'edit/:id',
        component: EditDepartmentComponent
      }
    ]
  }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
