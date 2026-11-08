import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeTraining } from '../app.interfaces/employee-training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTrainingService 
{
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetTrainingById(id: any) : Observable<any> {
    const payload = { id: id };
    return this._HttpClient.post(
      this.baseURL + 'EmployeeTraining/GetEmployeeTrainingById',
      payload
    );
  }
  GetTrainingByEmpId(EmpId: string) :Observable<any> {
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post(
      this.baseURL + 'EmployeeTraining/GetEmployeeTrainingByEmpId',
      payload, {headers : headers}
    );
  }

  AddTraining(Training: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeTraining/AddEmployeeTraining',
      Training
    );
  }
  UpdateTraining(training: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeTraining/UpdateEmployeeTraining',
      training
    );
  }

  DeleteTraining(id: number): Observable<any> {
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeTraining/DeleteEmployeeTraining',
      payload, {headers : headers}
    );
  }
}
