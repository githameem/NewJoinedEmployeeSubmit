import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeNominee } from '../app.interfaces/employee-nominee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeNomineeService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetNomineeById(id: any) {
    const payload = { id: id };
    return this._HttpClient.post(
      this.baseURL + 'EmployeeNominee/GetEmployeeNomineeById',
      payload
    );
  }

  GetNomineeByEmpId(EmpId: string): Observable<any>{
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(this.baseURL + 'EmployeeNominee/GetEmployeeNomineeByEmpId', payload, { headers: headers });
  }

  Addnominee(nominee: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeNominee/AddEmployeeNominee',
      nominee
    );
  }
  UpdateNominee(nominee: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeNominee/UpdateEmployeeNominee',
      nominee
    );
  }

  DeleteNominee(id: number) :Observable<any> {
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + "EmployeeNominee/DeleteEmployeeNominee",
      payload,{headers:headers}
    );
  }
}
