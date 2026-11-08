import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSignatureService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetSignatureByEmpId(EmpId: any): Observable<any> {
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeSignature/GetEmployeeSignatureByEmpId',
      payload,{headers:headers}
    );
  }

  UploadSignature(photo:any):Observable<any>{
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeSignature/UploadSignature',
      photo
    );
  }
}
