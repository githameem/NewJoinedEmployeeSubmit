import { Injectable } from '@angular/core';
import { EmployeePhoto } from '../app.interfaces/employee-photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeePhotoService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetPhototById(id: any):Observable<any> {
    const payload = { id: id };
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeePhoto/GetEmployeePhotoById',
      payload
    );
  }
  GetPhototByEmpId(EmpId: any): Observable<any> {
    const payload = JSON.stringify(EmpId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeePhoto/GetEmployeePhotoByEmpId',
      payload,{headers:headers}
    );
  }

  AddPhoto(Photo: any): Observable<any> {
    return this._HttpClient.post<EmployeePhoto>(
      this.baseURL + 'EmployeePhoto/AddEmployeePhoto',
      Photo
    );
  }
  UpdatePhoto(Photo: any): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeePhoto/UpdateEmployeePhoto',
      Photo
    );
  }
  UploadPhoto(photo:any):Observable<any>{
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeePhoto/UploadPhoto',
      photo
    );
  }

  DeletePhoto(id: number): Observable<any>{
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeePhoto/DeleteEmployeePhoto',
      payload, {headers:headers}
    );
  }
  RemovePhoto(id: any):Observable<any> {
    const payload = { id: id };
    return this._HttpClient.post<any>(
      this.baseURL + 'EmployeePhoto/DeleteEmployeePhoto',
      payload
    );
  }
}
