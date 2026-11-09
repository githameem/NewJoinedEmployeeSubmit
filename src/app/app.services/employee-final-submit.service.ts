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
    const payload = JSON.stringify(String(EmpId));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + "NewUserFinalSubmit/NewUserFinalSubmitByEmpId",
      payload,{headers : headers}
    );
  }

  /** Single source of truth: submitted only if success && any row has isFinalSubmit true/1/'true'. */
  static isSubmittedResponse(res: any): boolean {
    return res?.success === true && Array.isArray(res.datas) &&
      res.datas.some((r: any) => r?.isFinalSubmit === true || r?.isFinalSubmit === 1 ||
        String(r?.isFinalSubmit).toLowerCase() === 'true');
  }

  isFinalSubmitted(empId: string | number | null | undefined): Observable<boolean> {
    if (empId === null || empId === undefined || String(empId).trim() === '' || String(empId) === 'null') {
      return of(false);
    }
    return this.GetFinalSubmitByEmpId(String(empId)).pipe(
      map((res) => EmployeeFinalSubmitService.isSubmittedResponse(res)),
      catchError((err) => {
        console.error('GetFinalSubmitByEmpId failed', err);
        return of(false);
      })
    );
  }
}
