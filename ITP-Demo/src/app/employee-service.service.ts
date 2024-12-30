import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  url = `${environment.apiUrl}/employees`;
  constructor (private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee);
  }
  update(employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.url}/${employee._id}`, employee);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
