import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { EmployeeJobStatus } from '../app.interfaces/employee-job-status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeJobStatusService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetJobStatusById(id: any):Observable<AnalyserOptions> {
    const payload = { id: id };
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeJobStatus/GetEmployeeJobStatusById',
      payload
    );
  }
  GetJobStatusByEmpId(EmpId: any) : Observable<any> {
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + "EmployeeJobStatus/GetEmployeeJobStatusByEmpId",
      payload,{headers : headers}
    );
  }

  AddNewJobStatus(jobstatus: any): Observable<any>{
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeJobStatus/AddEmployeeJobStatus',
      jobstatus
    );
  }
  UpdateJobStatus(jobstatus: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeJobStatus/UpdateEmployeeJobStatus',
      jobstatus
    );
  }

  DeleteJobStatus(id: number): Observable<any> {
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeJobStatus/DeleteEmployeeJobStatus',
      payload,{ headers: headers }
    );
  }
}
