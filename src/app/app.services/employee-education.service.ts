import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeEducation } from '../app.interfaces/employee-education';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeEducationService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetEducationById(id: any) {
    const payload = { id: id };
    return this._HttpClient.post(
      this.baseURL + 'EmployeeEducation/GetEmployeeEducationById',
      payload
    );
  }
  GetEducationByEmpId(EmpId: number) :Observable<any>
  {
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post(
      this.baseURL + 'EmployeeEducation/GetEmployeeEducationByEmpId',
      payload, { headers: headers }
    );
  }

  AddNewEducation(education: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeEducation/AddEmployeeEducation',
      education
    );
  }
  UpdateEducation(education: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeEducation/UpdateEmployeeEducation',
      education
    );
  }

  DeleteEducation(id: number) : Observable<any>{
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeEducation/DeleteEmployeeEducation',
      payload,{ headers: headers }
    );
  }
}
