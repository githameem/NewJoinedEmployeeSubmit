import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFinalSubmitService 
{
  readonly finalSubmitted$ = new Subject<{ empId: any; submitted: boolean }>();

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

  isFinalSubmitted(empId: any): Observable<boolean> {
    return this.GetFinalSubmitByEmpId(empId).pipe(
      map((res) => res?.success === true && res.datas?.[0]?.isFinalSubmit === true),
      catchError(() => of(false)),
      tap((submitted) => this.finalSubmitted$.next({ empId, submitted }))
    );
  }
}
