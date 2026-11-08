import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFinalSubmitService 
{
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;
  FinalSubmit(objFinalSubmit: any): Observable<any>{
    return this._HttpClient.post<any>(
      this.baseURL + 'NewUserFinalSubmit/CreateNewUserFinalSubmit',
      objFinalSubmit
    );
  }
  GetFinalSubmitByEmpId(EmpId: any) : Observable<any> {
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + "NewUserFinalSubmit/NewUserFinalSubmitByEmpId",
      payload,{headers : headers}
    );
  }
}
