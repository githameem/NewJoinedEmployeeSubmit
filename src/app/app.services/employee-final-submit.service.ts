import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  /** Only isFinalSubmit === true || === 1 counts as submitted. Missing record / errors => false. */
  isFinalSubmitted(empId: any): Observable<boolean> {
    if (empId === null || empId === undefined || String(empId).trim() === '' || empId === 'null') {
      return of(false);
    }
    return this.GetFinalSubmitByEmpId(empId).pipe(
      map((res) => {
        if (res?.success === false) {
          console.warn('GetFinalSubmitByEmpId returned success=false', res?.message);
          return false;
        }
        const datas = res?.datas;
        const record = Array.isArray(datas) ? datas[0] : datas;
        const flag = record?.isFinalSubmit;
        return flag === true || flag === 1;
      }),
      catchError((err) => {
        console.error('GetFinalSubmitByEmpId failed', err);
        return of(false);
      })
    );
  }
}
