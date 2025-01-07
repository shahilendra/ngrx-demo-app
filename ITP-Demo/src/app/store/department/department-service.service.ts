import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Department } from './department.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = `${environment.apiUrl}/departments`;
  constructor (private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  getById(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.url}/${id}`);
  }
  create(department: Department): Observable<Department> {
    return this.http.post<Department>(this.url, department);
  }
  update(department: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.url}/${department._id}`, department);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}