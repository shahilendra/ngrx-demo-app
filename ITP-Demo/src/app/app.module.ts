import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEffects, appStore } from './store/store';
import { EmployeeServiceService } from './employee-service.service';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import {MenuItemComponent} from './layout/menu-item/menu-item.component'
import { HeaderComponent } from './layout/header.component';
import { LayoutComponent } from './layout/layout.component';
import { PageHeaderComponent } from './layout/page-header.component';
import { HomeComponent } from './home.component';
import { SalesComponent } from './sales.component';
import { DepartmentComponent } from './department/department.component';
import { ToastrModule } from 'ngx-toastr';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    MenuItemComponent,
    HeaderComponent,
    LayoutComponent,
    PageHeaderComponent,
    SalesComponent,
    HomeComponent,
    DepartmentComponent,
    AddEmployeeComponent,
    EditDepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    FormsModule, MatFormFieldModule, MatInputModule,
    StoreModule.forRoot(appStore),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
  ],
  providers: [provideStore(appStore), provideEffects(appEffects), EmployeeServiceService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
