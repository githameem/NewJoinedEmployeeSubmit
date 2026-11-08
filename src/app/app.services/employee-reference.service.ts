import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { EmployeeReference } from '../app.interfaces/employee-reference';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeReferenceService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetReferenceById(id: any) {
    const payload = { id: id };
    return this._HttpClient.post(
      this.baseURL + 'EmployeeReference/GetEmployeeReferenceById',
      payload
    );
  }

  GetReferenceByEmpId(EmpId: string): Observable<any> {
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeReference/GetEmployeeReferenceByEmpId',
      payload, { headers: headers}
    );
  }

  AddReference(reference: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeReference/AddEmployeeReference',
      reference
    );
  }
  UpdateReference(reference: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeReference/UpdateEmployeeReference',
      reference
    );
  }

  DeleteReference(id: number):Observable<any>{
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeReference/DeleteEmployeeReference',
      payload, { headers: headers}
    );
  }
}
