import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { EmployeeContact } from '../app.interfaces/employee-contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeContactService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetContactById(id: number): Observable<any> {
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post(
      this.baseURL + 'EmployeeContact/GetEmployeeContactById',
      payload,{headers:headers}
    );
  }

  AddNewContact(contact: any): Observable<any> 
  {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeContact/AddNewEmployeeContact',
      contact
    );
  }
  UpdateContact(contact: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeeContact/UpdateEmployeeContact',
      contact
    );
  }

  DeleteContact(id: any) {
    const payload = { EnpId: id };
    return this._HttpClient.post<EmployeeContact>(
      this.baseURL + 'EmployeeContact/DeleteEmployeeContact',
      payload
    );
  }
}
