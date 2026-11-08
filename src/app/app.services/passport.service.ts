import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { EmployeePassport } from '../app.interfaces/employee-passport';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassportService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetPassportById(id: any) : Observable<any>{
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'Passport/GetPassportById',
      payload,{headers:headers}
    );
  }

  AddPassport(passport: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'Passport/AddNewPassport',
      passport
    );
  }
  UpdatePassport(passport: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'Passport/UpdatePassport',
      passport
    );
  }

  DeletePassport(id: any):Observable<any>{
    const payload = { EmpId: id };
    return this._HttpClient.post<EmployeePassport>(
      this.baseURL + 'Passport/DeletePassport',
      payload
    );
  }
}
